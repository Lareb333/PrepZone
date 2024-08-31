import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-student-result-list',
  templateUrl: './student-result-list.component.html',
  styleUrls: ['./student-result-list.component.scss']
})
export class StudentResultListComponent implements OnInit {
  displayDiv: boolean = false
  sortBy: number = 1
  public resultList$:
    | Observable<{
      error: boolean
      total: number
      page: number
      limit: number
      results: [
        {
          name: string
          date: string
          _id: string
          marks:number
        }
      ]
      pageno: [number]
    }>
    | undefined
  public search: string = ''
  public subject: string = 'All'
  public page: number = 1
  constructor(private api: ApiService,private router:Router) { }

  ngOnInit(): void {
    this.getData()
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
      this.sortBy
    this.resultList$ = this.api.resultList(query)
  }
  toggleDisplay() {
    this.displayDiv = !this.displayDiv
  }
  navigate(id:string):void{
     this.router.navigate(['student/result/' + id])
  }
}

