import { Component, OnInit } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { MessagesService } from '../messages/messages.service';
import { HttpClient } from '@angular/common/http';
import { UserlistService } from './userlist.service';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit {
  private permissions = ["user.read.all"];
  public userList: [];
  private url = "https://graph.microsoft.com/v1.0/users";

  constructor(private messageService: MessagesService, 
    private http: HttpClient,
    private msalService: MsalService,
    private userlistService: UserlistService) { }

  ngOnInit() {
    this.userlistService.getUsers()
      .then(result => { 
        console.log("SUCCESS!" + JSON.stringify(result)); 
        this.userList = result;
      })
      .catch(error => { console.error("Error happened." + JSON.stringify(error)); });
  }

}
