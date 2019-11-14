import { Component, OnInit } from '@angular/core';
import { ReimbursementListService } from '../../shared/reimbursement-list.service';
import { ToastrService } from 'ngx-toastr';
import { ReimbursementList } from 'src/app/shared/reimbursement-list.model';
import { Observable, empty } from 'rxjs';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';



@Component({
  selector: 'app-administrator',
  templateUrl: './administrator.component.html',
  styleUrls: ['./administrator.component.css']
})
export class AdministratorComponent implements OnInit {

  formData: ReimbursementList;
  listAD: ReimbursementList[] = [ ];

  constructor(public service: ReimbursementListService, private toastr: ToastrService, public router: Router) { }

  ngOnInit() {
    this.service.refreshList();
    this.formData = new ReimbursementList();
  }

  onDecline(rem: ReimbursementList) {
    if (confirm('Are you sure to Decline this record?')) {
      rem.RequestedPhase = 'Decline';
      this.service.putReimbursement(rem).subscribe((res) => {
        // this.service.refreshList();
        this.adminReimbursement('Pending');
        this.toastr.warning('Declined Successfully', 'Reimbursement. Portal');
      });
    }
  }

  onApprove(rem: ReimbursementList) {
    if (confirm('Are you sure to Approve this record?')) {
      rem.RequestedPhase = 'Approve';
      this.service.putReimbursement(rem).subscribe((res) => {
        // this.service.refreshList();
        this.pendingReimbursement('Pending');
        this.toastr.warning('Approved Successfully', 'Reimbursement. Portal');
      });
    }
  }

  adminReimbursement(phase: string) {
      this.listAD = [];
      // tslint:disable-next-line: prefer-const
      for (let rem of this.service.list) {
        if ( rem.RequestedPhase === phase) {
          this.listAD.push(rem);
        }
      }
  }

  pendingReimbursement(phase: string) {
    this.listAD = [];
    // tslint:disable-next-line: prefer-const
    for (let rem of this.service.list) {
      if ( rem.RequestedPhase === phase) {
        this.listAD.push(rem);
      }
    }
  }

  typeSubmit(form: ReimbursementList) {
    this.listAD = [];
    // tslint:disable-next-line: prefer-const
    for (let rem of this.service.list) {
      if (rem.ReimbursementType === form.ReimbursementType ) {
        this.listAD.push(rem);
      }
    }
    // form.ReimbursementType = ' ';
    // this.toastr.success('Searched Successfully', 'Reimbursement. Portal');
  }

  Logout() {
    localStorage.removeItem('userToken');
    this.router.navigate(['/login']);
  }

}
