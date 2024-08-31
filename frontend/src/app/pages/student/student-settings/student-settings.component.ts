import { Component, OnInit } from '@angular/core'
import { Observable } from 'rxjs'
import { ApiService } from 'src/app/services/api.service'
import { ProfileData } from 'src/app/services/profileData.interface'

@Component({
  selector: 'app-student-settings',
  templateUrl: './student-settings.component.html',
  styleUrls: ['./student-settings.component.scss'],
})
export class StudentSettingsComponent implements OnInit {
  public profileData$: Observable<ProfileData> | undefined
  check=true
  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.profileData$ = this.api.profileData()
  }
  logout():void{
    this.api.logout()
  }
}
