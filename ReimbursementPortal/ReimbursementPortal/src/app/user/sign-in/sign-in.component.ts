import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { UserService } from 'src/app/shared/user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  isLoginError = false;
  constructor(private userService: UserService, private router: Router, private toastr: ToastrService) { }

  ngOnInit() {
  }

  OnSubmit(userName, password){
    this.userService.userAuthentication(userName, password).subscribe((data: any) => {
      console.log(data);
      localStorage.setItem('userToken', data.access_token);
      localStorage.setItem('userName', userName);
      this.toastr.success('Logged In Successfully', 'Reimbursement. Portal');
      // tslint:disable-next-line: triple-equals
      if (userName == 'adminEmail') {
        this.router.navigate(['/administrator']);
      } else {
        this.router.navigate(['/home']);
      }
    },
    (err: HttpErrorResponse) => {
      this.isLoginError = true;
    });
 }

}
