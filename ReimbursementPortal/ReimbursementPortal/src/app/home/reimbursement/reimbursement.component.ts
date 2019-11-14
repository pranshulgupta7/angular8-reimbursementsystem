import { Component, OnInit } from '@angular/core';
import { ReimbursementListService } from 'src/app/shared/reimbursement-list.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UploadImageService } from 'src/app/shared/upload-image.service';

@Component({
  selector: 'app-reimbursement',
  templateUrl: './reimbursement.component.html',
  styleUrls: ['./reimbursement.component.css']
})
export class ReimbursementComponent implements OnInit {

  // tslint:disable-next-line: quotemark
  imageURL = "../../../../../assets/img.png";
  fileToUpload: File = null;

  constructor(public service: ReimbursementListService, private toastr: ToastrService, private imageService: UploadImageService) { }

  ngOnInit() {
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    if (form != null) {
      form.resetForm();
    }
    this.service.formData = {
      Id: -1,
      Date: null,
      ReimbursementType: '',
      RequestedValue: null,
      ApprovedValue: null,
      Currency: '',
      RequestedPhase: '',
      ReceiptAttached: '',
      userName: ''
    };
  }

  onSubmit(form: NgForm) {
    // tslint:disable-next-line: triple-equals
    if (form.value.Id == -1 || form.value.Id == null) {
      form.value.Id = 1;
      form.value.RequestedPhase = 'Pending';
      form.value.userName = localStorage.getItem('userName');
      this.insertRecord(form);
    } else {
        form.value.userName = localStorage.getItem('userName');
        form.value.RequestedPhase = 'Pending';
        this.updateRecord(form);
    }
  }

  insertRecord(form: NgForm) {
    this.service.postReimburement(form.value).subscribe((res) => {
      this.toastr.success('Inserted Successfully', 'Reimbursement. Portal');
      this.resetForm(form);
      this.service.refreshList();
      window.location.reload();
    });
  }

  updateRecord(form: NgForm) {
    this.service.putReimbursement(form.value).subscribe((res) => {
      this.toastr.info('Updated Successfully', 'Reimbursement. Portal');
      this.resetForm(form);
      window.location.reload();
      this.service.refreshList();
    });
  }


  // Image - work
  handleFileInput(file: FileList) {
    this.fileToUpload = file.item(0);
    // Show image preview
    // tslint:disable-next-line: prefer-const
    let reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageURL = event.target.result;
    };
    reader.readAsDataURL(this.fileToUpload);
  }

  OnSubmit(Caption, Image) {
    console.log('helloWorld');
    this.imageService.postFile(Caption.value, this.fileToUpload).subscribe((data) => {
        console.log('done');
        Caption.value = null;
        Image.value = null;
        // tslint:disable-next-line: quotemark
        this.imageURL = "../../../../../assets/img.png";
      }
    );
   }


}
