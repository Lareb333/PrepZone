import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-new-student',
  templateUrl: './new-student.component.html',
  styleUrls: ['./new-student.component.scss'],
})
export class NewStudentComponent implements OnInit {
  public name: string = '';
  public nameError: string = '';
  public phoneNumber: number | undefined;
  public phoneNumberError: string = '';
  public prepError: string = '';
  public prep: string = '';
  public valid: boolean = false;
  constructor(
    private api: ApiService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    const state = this.router.lastSuccessfulNavigation?.extras.state;
    this.name = state ? state?.['name'] : '';
    setInterval(()=>{

    console.log(this.prep)
    },1000)
  }
  nameValid(): void {
    const trimmedName = this.name.trim();

    if (trimmedName === '') {
      this.nameError = 'Please enter a valid name';
      this.valid = false;
    } else if (!/^[a-zA-Z\s]*$/.test(trimmedName)) {
      this.nameError = 'Invalid characters in name';
      this.valid = false;
    } else {
      this.nameError = '';
      this.valid = true;
    }
  }
  prepValid(): void {
    const trimmedName = this.prep.trim();

    if (trimmedName === '') {
      this.prepError = 'Please Select which exam you preparing for';
      this.valid = false;
    } else {
      this.prepError = '';
      this.valid = true;
    }
  }
  phoneNumberValid(): void {
    const phoneNumber = this.phoneNumber;

    if (!phoneNumber) {
      this.phoneNumberError = 'Please enter a valid phone number';
      this.valid = false;
    } else if (!/^\d{10}$/.test(phoneNumber.toString())) {
      this.phoneNumberError =
        'Invalid phone number format. Must be 10 digits long.';
      this.valid = false;
    } else {
      this.phoneNumberError = '';
      this.valid = true;
    }
  }

  onSubmit(form: NgForm): void {
    if (
      this.valid &&
      this.name !== ' ' &&
      this.phoneNumber !== undefined &&
      this.prep !== ''
    ) {
      this.api.newStudentPost(form.value).subscribe(
        (response) => {
          this.router.navigate(['/student/dashboard/jee']);
        },
        (error) => {
          console.error('Error updating data:', error);
        },
      );
    } else {
      this.prepValid();
      this.phoneNumberValid();
      this.nameValid();
    }
  }
}
