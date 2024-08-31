import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { Observable } from 'rxjs'
import { ApiService } from 'src/app/services/api.service'

@Component({
  selector: 'app-student-test-list',
  templateUrl: './student-test-list.component.html',
  styleUrls: ['./student-test-list.component.scss'],
})
export class StudentTestListComponent implements OnInit {
  displayDiv: boolean = false
  sortBy: number = 1
  public testList$:
    | Observable<{
      error: boolean
      total: number
      page: number
      limit: number
      tests: [
        {
          name: string
          exam: string
          date: string
          totalQuestions: number
          _id: string
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
    this.testList$ = this.api.testList(query)
  }
  toggleDisplay() {
    this.displayDiv = !this.displayDiv
  }
  navigate(id:string):void{
     this.router.navigate(['student/test/' + id])
  }
}
