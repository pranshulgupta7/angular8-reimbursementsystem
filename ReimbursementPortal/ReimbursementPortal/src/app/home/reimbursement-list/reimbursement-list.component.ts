import { Component, OnInit } from '@angular/core';
import { ReimbursementListService } from 'src/app/shared/reimbursement-list.service';
import { ReimbursementList } from 'src/app/shared/reimbursement-list.model';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reimbursement-list',
  templateUrl: './reimbursement-list.component.html',
  styleUrls: ['./reimbursement-list.component.css']
})
export class ReimbursementListComponent implements OnInit {

  readonly rootURL = 'http://localhost:49877/api';
  list1: ReimbursementList[] = [];
  rem1: ReimbursementList;

  constructor(public service: ReimbursementListService, private toastr: ToastrService, private http: HttpClient) { }

  ngOnInit() {
    this.refreshList1();
  }

  populateForm(rem: ReimbursementList) {
    this.service.formData = Object.assign({}, rem);
  }

  onDelete(id: number){
    if (confirm('Are you sure to delete this record?')) {
      this.service.deleteReimbursement(id).subscribe((res) => {
        this.service.refreshList();
        this.toastr.warning('Deleted Successfully', 'Reimbursement. Portal');
      });
      window.location.reload();
    }
  }

  refreshList1() {
    this.http.get(this.rootURL + '/ReimbursementTable')
    .toPromise().then((res) => {
       // tslint:disable-next-line: prefer-const
       for (this.rem1 of res as ReimbursementList[] ) {
        // tslint:disable-next-line: prefer-const
        let x = localStorage.getItem('userName');
        console.log(this.rem1.userName);
         // tslint:disable-next-line: triple-equals
        if (this.rem1.userName == x) {
            console.log('hello');
            this.list1.push(this.rem1);
         }
       }
    });
  }

}
