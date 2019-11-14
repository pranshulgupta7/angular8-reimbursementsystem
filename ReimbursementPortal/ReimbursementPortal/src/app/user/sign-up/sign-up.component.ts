import { Component, OnInit } from '@angular/core';
import { User } from '../../shared/user.model';
import { NgForm } from '@angular/forms';
import { UserService } from '../../shared/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  user: User;
  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';

  constructor(private userService: UserService, private toastr: ToastrService) { }

  ngOnInit() {
    this.resetForm();
  }


  resetForm(form?: NgForm){
    if (form != null){
      form.resetForm();
    }
    this.user = {
      Id: null,
      Email: '',
      Password: '',
      ReTypePassword: '',
      FullName: '',
      PanNumber: null,
      Bank: '',
      BankAccountNumber: null
    };
  }

  OnSubmit(form: NgForm) {
    // tslint:disable-next-line: triple-equals
    if (this.user.Password != this.user.ReTypePassword) {
      alert('Passwords not matching');
      return;
    }
    this.userService.registerUser(form.value)
      .subscribe((data: any) => {
        // tslint:disable-next-line: triple-equals
        if (data.Succeeded == true) {
          this.toastr.success('Registered Successfully', 'Reimbursement. Portal');
          this.resetForm(form);
        }
          // this.toastr.success('User Registration Successful');
        // } else {
        //   this.toastr.error(data.Errors[0]);
        // }
      });
  }

}
