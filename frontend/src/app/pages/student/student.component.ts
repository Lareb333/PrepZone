import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { Observable } from 'rxjs'
import { ApiService } from 'src/app/services/api.service'

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss'],
})
export class StudentComponent implements OnInit {
  profileImg$?: Observable<{ profileImg: string,name:string }>
  isClassAdded: boolean = false

  public height: number = 0
  public hi1: string = ''
  constructor(private router: Router, private api: ApiService) {
    this.height = window.innerHeight
    this.hi1 = `${this.height}px`
  }

  ngOnInit(): void {
    this.profileImg$ = this.api.userImg()
  }
  addClassToElement(b: any): void {
    this.isClassAdded = !this.isClassAdded
    if (b.style.marginRight == '0px' || b.style.marginRight == '') {
      b.style.marginRight = '-90.46px'
    } else {
      b.style.marginRight = '0px'
    }
  }

  userLogout(): void {
    this.api.logout()
  }
  goHome(): void {
    this.router.navigate(['/'])
  }
}
