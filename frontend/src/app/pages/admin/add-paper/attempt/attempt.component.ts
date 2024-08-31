import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AdminApiService } from 'src/app/services/admin-api.service';

@Component({
  selector: 'app-attempt',
  templateUrl: './attempt.component.html',
  styleUrl: './attempt.component.scss',
})
export class AttemptComponent implements OnInit {
  testId: string = '';
  search:string=''
  page:number=1
  sortBy:number=-1
  attemptData$:Observable<{
        error: boolean;
      total: number;
      page: number;
      limit: number;
      students: [
        {
          _id: string;
          name: string;
          profileImg: string;
          results: [
            {
              name: string;
              date: string;
              _id: string;
              marks: number;
            }
          ];
        }
      ];
      pageno: [number];
  }> | undefined
  loadingArray: number[]=[0,0,0,0,0,0,0,0,0,0]
    displayDiv: boolean = false;


  constructor(private route: ActivatedRoute,private api:AdminApiService) {}
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const idFromUrl = params.get('id');
      this.testId = idFromUrl !== null ? idFromUrl : '';
    });
    this.getData()
  }
  getData():void{
    let query: string =
      '?testId=' +
      this.testId +
      '&search=' +
      this.search +
      '&page=' +
      this.page +
      '&sort=' +
      this.sortBy +
      '&limit=10';
    this.attemptData$ = this.api.attemptData(query)
  }
  toggleDisplay() {
    this.displayDiv = !this.displayDiv;
  }
}
