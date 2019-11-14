import { Component, OnInit } from '@angular/core';
import { UploadImageService } from 'src/app/shared/upload-image.service';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.css'],
  providers: [UploadImageService]
})
export class UploadImageComponent implements OnInit {

  // tslint:disable-next-line: quotemark
  imageURL = "../../../../../assets/img.png";
  fileToUpload: File = null;

  constructor(private imageService: UploadImageService) { }

  ngOnInit() {
  }

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
