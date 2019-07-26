import { Component, OnInit } from '@angular/core';
import { MessagesService } from '../messages/messages.service';
import { MyriskService } from './myrisk.service';

@Component({
  selector: 'app-myrisk',
  templateUrl: './myrisk.component.html',
  styleUrls: ['./myrisk.component.css']
})
export class MyriskComponent implements OnInit {
  public riskList: [];

  constructor(private messageService: MessagesService, 
    private riskService: MyriskService) { }

  ngOnInit() {
    this.riskService.getRisks()
      .then(result => {
        console.log("Success: " + JSON.stringify(result));
        this.riskList = result;
      })
      .catch(error => {
        console.log("ERROR: " + JSON.stringify(error));
      });
  }

}
