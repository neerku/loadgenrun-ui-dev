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
  //apiUrl = 'https://cosmostomongo-dot-onedata-mvp.appspot.com';
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
    return this.http.get(this.apiUrl + '/project/' + id);
  }

  getProjectList() {
    return this.http.get(this.apiUrl + '/project');
  }

  getVmLocations(request: any) {
    return this.http.post(this.apiUrl + '/utility/machine/locations', request);
  }

  getVmSizes(request: any, location: string) {
    return this.http.post(this.apiUrl + '/utility/machine/' + location + '/sizes', request);
  }

  validateCosmos(request: any) {
    return this.http.post(this.apiUrl + '/utility/validate/cosmos', request);
  }

  validateMongo(request: any) {
    return this.http.post(this.apiUrl + '/utility/validate/mongo', request);
  }

  startDumpProcess(id: string) {
    return this.http.post(this.apiUrl + '/project/' + id + '/dump', '');
  }

  reStartDumpProcess(id: string) {
    return this.http.post(this.apiUrl + '/project/' + id + '/dump/restart', '');
  }

  startRestoreProcess(id: string) {
    return this.http.post(this.apiUrl + '/project/' + id + '/restore', '');
  }

  processChangeStream(id: string) {
    return this.http.post(this.apiUrl + '/project/' + id + '/events', '');
  }

  validateMigration(id: string) {
    return this.http.post(this.apiUrl + '/utility/validate/migration/'+ id , '');
  }

  getSampleValidationData(id:any,database: string, collection:string) {
    return this.http.post(this.apiUrl + '/utility/validate/migration/'+ id +'/'+ database+ '/' + collection+ '/sample', '');
  }
}
