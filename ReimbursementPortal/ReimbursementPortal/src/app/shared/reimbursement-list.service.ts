import { Injectable } from '@angular/core';
import { ReimbursementList } from './reimbursement-list.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReimbursementListService {

  formData: ReimbursementList;
  list: ReimbursementList[];


  // tslint:disable-next-line: quotemark
  readonly rootURL = "http://localhost:49877/api";

  constructor(private http: HttpClient) { }

  postReimburement(formData: ReimbursementList) {
    return this.http.post(this.rootURL + '/ReimbursementTable', formData);
   }

   refreshList() {
     this.http.get(this.rootURL + '/ReimbursementTable')
     .toPromise().then((res) => {
        this.list = res as ReimbursementList[];
     });
   }

   putReimbursement(formData: ReimbursementList){
     return this.http.put(this.rootURL + '/ReimbursementTable/' + formData.Id, formData);
   }

   deleteReimbursement(id: number) {
     return this.http.delete(this.rootURL + '/ReimbursementTable/' + id);
   }

   postFile(caption: string, fileToUpload: File) {
    const endpoint = 'http://localhost:49877/api/UploadImage';
    const formData: FormData = new FormData();
    formData.append('Image', fileToUpload, fileToUpload.name);
    formData.append('ImageCaption', caption);
    return this.http.post(endpoint, formData);
  }
}
