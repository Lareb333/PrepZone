import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AdminApiService } from 'src/app/services/admin-api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  dashboardData$:
    | Observable<{
       totalStudent:number,
        jeePhysics:number,
        jeeChemistry:number,
        jeeMath:number,
        numPhysics:number,
        numChemistry:number,
        numMath:number,
        neetPhysics:number,
        neetChemistry:number,
        neetBio:number
      }>
    | undefined;
  search:string=''
  page:number=1
  exam:string='Jee'
  displayDiv: boolean = false;
  sortBy:number=-1
  loadingArray:number[]=[0,0,0,0,0,0,0,0,0,0,0,0]
  studentData$:Observable<{
      error: boolean;
      total: number;
      page: number;
      limit: number;
      students: [{
        name: string;
        topMarks: [number,number];
        averageMarks: [number,number];
        phoneNumber: number;
        prep: string;
        email: string;
        profileImg: string;
      }];
      pageno: [number];
  }> | undefined
  constructor(private api: AdminApiService) {
  }
  getData():void{
    let query: string =
      '?search=' +
      this.search +
      '&exam=' +
      this.exam +
      '&page=' +
      this.page +
      '&sort=' +
      this.sortBy +
      '&limit=12';

    this.studentData$ = this.api.studentData(query)
  }
  toggleDisplay() {
    this.displayDiv = !this.displayDiv;
  }

  ngOnInit(): void {
    this.dashboardData$ = this.api.dashboardData();
    this.getData()
  }
}
