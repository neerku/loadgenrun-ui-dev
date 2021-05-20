import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { collapseTextChangeRangesAcrossMultipleVersions } from 'typescript';

@Injectable({
  providedIn: 'root',
})
export class KeyholeService {
  //baseUrl = environment.baseUrl;
  //apiUrl = 'https://mloadgenapi.tools.peerislands.io';
  //apiUrl = 'https://load-gen-api-dot-onedata-mvp.uc.r.appspot.com';
  apiUrl = 'https://cosmostomongo.azurewebsites.net';
  //apiUrl: string;

  constructor(private http: HttpClient) {}

  saveProject(request: any) {
    return this.http.post(this.apiUrl + '/project', request);
  }

  getDbList(request: any) {
    return this.http.post(this.apiUrl + '/utility/dblist', request);
  }

  getProject(id: string) {
    return this.http.get(this.apiUrl + '/project/id='+id);
  }
  
  getProjectList() {
    return this.http.get(this.apiUrl + '/project');
  }
 
  validateCosmos(request: any) {
    return this.http.post(this.apiUrl + '/utility/validate/cosmos', request);
  }

  validateMongo(request: any) {
    return this.http.post(this.apiUrl + '/utility/validate/mongo', request);
  }

  

  
}
