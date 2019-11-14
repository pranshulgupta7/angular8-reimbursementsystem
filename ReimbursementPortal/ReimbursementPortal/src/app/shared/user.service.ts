import { Injectable } from '@angular/core';
import { User } from './user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  formData: User;
  readonly rootURL = 'http://localhost:49877/';

  constructor(private http: HttpClient) { }

  registerUser(user: User) {
    const body: User = {
      Id: user.Id,
      Email: user.Email,
      Password: user.Password,
      ReTypePassword: user.ReTypePassword,
      FullName: user.FullName,
      PanNumber: user.PanNumber,
      Bank: user.Bank,
      BankAccountNumber: user.BankAccountNumber
    };
    return this.http.post(this.rootURL + 'api/User/Register', body);
  }

  // postUser(formData: User){
  //   return this.http.post(this.rootURL + '/usertable', formData);
  // }

  userAuthentication(userName, password) {
    const data = 'username=' + userName + '&password=' + password + '&grant_type=password';
    const reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-urlencoded', 'No-Auth': 'True' });
    return this.http.post(this.rootURL + '/token', data, { headers: reqHeader });
  }

  getUserClaims() {
    // tslint:disable-next-line: max-line-length
    return  this.http.get(this.rootURL + '/api/GetUserClaims', {headers: new HttpHeaders({Authorization: 'Bearer' + localStorage.getItem('userToken')})});
   }


}
