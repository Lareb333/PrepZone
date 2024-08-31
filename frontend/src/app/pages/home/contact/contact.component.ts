import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  constructor(private api:ApiService){}
  submit:boolean=false
  onSubmit(form:NgForm):void{
    this.api.sendContactUsMsg(form).subscribe(d=>{
       this.submit=true
       form.resetForm()
       setTimeout(()=>{
         this.submit=false
       },10000)
    })
  }

}
