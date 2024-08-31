import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AdminApiService } from 'src/app/services/admin-api.service';

@Component({
  selector: 'app-test-list',
  templateUrl: './test-list.component.html',
  styleUrl: './test-list.component.scss'
})
export class TestListComponent {
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
  constructor(private api: AdminApiService ,private router:Router) { }

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
  navigateAdd():void{
     this.router.navigate(['admin/test/add'])
  }
  navigateStudent(id:string):void{
     this.router.navigate(['admin/test/resultList/' + id])
  }
  deleteTest(id:string):void{
    this.api.deleteTest(id).subscribe(e=>{
      this.getData()
    })
  }
}
