import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MsalService } from '@azure/msal-angular';

@Injectable({
  providedIn: 'root'
})
export class MyriskService {
  private url = "https://graph.microsoft.com/beta/identityRiskEvents?#$filter=userID eq"; //need to change this to security api
  private permissions = ["IdentityRiskEvent.Read.All"]; //update to security graph permission
  private risks: Promise<any>;

  constructor(private http: HttpClient, private msalService: MsalService) { }

  getRisks(): Promise<[]> {
    var user = this.msalService.getUser();
    console.log("User: " + JSON.stringify(user));

    var userName = this.msalService.getUser().displayableId;
    var builtUrl = `${this.url} '${userName}'`;
    console.log("Build URL: " + builtUrl);
    var p = new Promise<[]>(
      (resolve, reject) => {
        this.msalService.acquireTokenSilent(this.permissions)
          .then(token => {
            this.http.get<any>(builtUrl, {headers: {"Authorization": "Bearer " + token } })
              .subscribe(
                result => { resolve(result.value); },
                error => { reject(error); }
              )
          })
      });
    return p;
  }
}
