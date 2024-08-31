import {
  Component,
  OnInit,
} from '@angular/core'
import { Router } from '@angular/router'
import { AdminApiService } from 'src/app/services/admin-api.service'

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  public isClassAdded: Boolean = false
  public height: number = 0
  public hi1:string=''
  constructor(private router: Router) {
    this.height = window.innerHeight
    this.hi1=`${this.height}px`
  }

  ngOnInit(): void {
  }
  logout(): void {
    localStorage.removeItem('admintoken')
    this.router.navigate(['adminlogin'])
  }
  goHome(): void {
    this.router.navigate(['/'])
  }
}
