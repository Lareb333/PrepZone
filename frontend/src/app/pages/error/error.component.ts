import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss'],
})
export class ErrorComponent implements OnInit {
  errorMsg: string='Invalid Url'
  count:number=10
  constructor(private router: Router) {
    const state = this.router.getCurrentNavigation()?.extras.state
    this.errorMsg = state ? state?.['errorMsg'] : ['Invalid Url']
  }
  ngOnInit(): void {
    setTimeout(()=>{
      this.navigateHome()
    },10000)
    setInterval(()=>{
       this.count--;
    },1000)
  }
  navigateHome():void{
    this.router.navigate([''])
  }
}
