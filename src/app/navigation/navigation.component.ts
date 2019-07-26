import { Component, OnInit } from '@angular/core';
import { MessagesService } from '../messages/messages.service';
import { MsalService, BroadcastService } from "@azure/msal-angular";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  userName = "";
  btnText = "Log In";
  showLogin = true;

  constructor(private messageService: MessagesService, 
    private msalService: MsalService,
    private broadcastService: BroadcastService) {
    messageService.add('NavigationComponenet Constructor Called');
  }

  ngOnInit() {
    this.log('ngOnInit() called');
    if(this.msalService.getUser()){
      this.userName = this.msalService.getUser().name;
      this.btnText = "Log Off";
      this.showLogin = false;
    }
  }

  updateDisplay() {
    this.userName = this.msalService.getUser().name;
    this.btnText = "Log Off";
    this.showLogin = true;
  }

  logInLogOut() {
    if(this.msalService.getUser()){
      this.msalService.logout();
    }
    else {
      this.log("logInLogOut - Log In.");
      this.msalService.loginPopup(["user.read", "user.read.all"])
        .then(result => { 
          console.log("Login success " + JSON.stringify(result));
          this.log(`Success! Hello ${this.msalService.getUser().name}.`); 

          //this.userName = this.msalService.getUser().name;
          //this.btnText = "Log Off";
          //this.showLogin = true;
          this.updateDisplay();
        })
        .catch(error => { this.log(JSON.stringify(error)); })
    }
  }

  log(message: string) {
    this.messageService.add(`NavigationComponent: ${message}`);
  }
}
