import { Component, OnInit } from '@angular/core'
import { Observable } from 'rxjs'
import { ApiService } from 'src/app/services/api.service'

@Component({
  selector: 'app-student-notes',
  templateUrl: './student-notes.component.html',
  styleUrls: ['./student-notes.component.scss'],
})
export class StudentNotesComponent implements OnInit {
  displayDiv: boolean = false
  sortBy: number = -1
  public pdfData$:
    | Observable<{
      error: boolean
      total: number
      page: number
      limit: number
      pdfs: [
        {
          name: string
          url: string
        }
      ]
      pageno: [number]
    }>
    | undefined
 public search:string=''
 public subject:string='All'
 public page:number=1
  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.getData()
  }
  toggleDisplay() {
    this.displayDiv = !this.displayDiv
  }
  getData():void{
    let query:string='?search=' + this.search + '&subject=' + this.subject + '&page=' + this.page + '&sort=' + this.sortBy
    this.pdfData$=this.api.pdfData(query)
  }
  pdfDownload(url:string):void{
      this.api.pdfDownload(url).subscribe()
  }
}
