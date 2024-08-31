import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { AdminApiService } from 'src/app/services/admin-api.service';

@Component({
  selector: 'app-upload-pdf',
  templateUrl: './upload-pdf.component.html',
  styleUrls: ['./upload-pdf.component.scss'],
})
export class UploadPdfComponent implements OnInit {
  addPopup: boolean = false;
  displayDiv: boolean = false;
  sortBy: number = -1;
  public pdfData$:
    | Observable<{
        error: boolean;
        total: number;
        page: number;
        limit: number;
        pdfs: [
          {
            name: string;
            url: string;
          }
        ];
        pageno: [number];
      }>
    | undefined;
  public search: string = '';
  public subject: string = 'All';
  public page: number = 1;
  public subject1: string = 'physics';
  constructor(private api: AdminApiService) {}

  ngOnInit(): void {
    this.getData();
  }
  toggleDisplay() {
    this.displayDiv = !this.displayDiv;
  }
  getData(): void {
    let query: string =
      '?search=' +
      this.search +
      '&subject=' +
      this.subject +
      '&page=' +
      this.page +
      '&sort=' +
      this.sortBy;
    this.pdfData$ = this.api.pdfData(query);
  }
  pdfDownload(url: string): void {
    this.api.pdfDownload(url).subscribe();
  }
  deletePdf(id: string): void {
    this.api.deletePdf(id).subscribe((e) => {
      this.getData();
    });
  }
  onSubmit(form: NgForm,pdf:any): void {
    const formData = new FormData();
    formData.append('name', form.value.name);
    formData.append('subject', this.subject1);
    formData.append('pdf', pdf.files[0]);
    console.log(form.value)
    this.api.uploadPdf(formData).subscribe((e) => {
      this.addPopup = false;
      this.getData();
    });
  }
}
