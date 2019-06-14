import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MsalService } from '@azure/msal-angular';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserlistService {
  private url = "https://graph.microsoft.com/v1.0/users";
  private permissions = ["user.read.all"];
  private userList: Promise<any>;

  constructor(private http: HttpClient, private msalService: MsalService) { 
    
  }

  getUsers(): Promise<[]> {
    var p =  new Promise<[]>( (resolve, reject) => {
      this.msalService.acquireTokenSilent(this.permissions)
        .then(token => {
          this.http.get<any>(this.url, {headers: {"Authorization": "Bearer " + token} })
            .subscribe(
              result => { resolve(result.value); },
              error => { reject(error); }
            )
        })
      });
    return p;
  }
}
