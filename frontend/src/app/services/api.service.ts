import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { Observable } from 'rxjs'
import { environment } from 'src/environments/environment'
import { JeeData } from './jeeData.interface'
import { NeetData } from './neetData.interface'
import { ProfileData } from './profileData.interface'
import { map } from 'rxjs/operators'
import { NgForm } from '@angular/forms'

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient, private router: Router) { }
  logout(): void {
    localStorage.removeItem('token')
    this.router.navigate(['/'])
  }
  profileData(): Observable<ProfileData> {
    return this.http.get<ProfileData>(
      environment.trinityApiUrl + '/student/profileData'
    )
  }
  userImg(): Observable<{ profileImg: string ,name:string}> {
    return this.http.get<{ profileImg: string,name:string }>(
      environment.trinityApiUrl + '/student/profileImg'
    )
  }
  jeeData(): Observable<JeeData> {
    return this.http.get<JeeData>(
      environment.trinityApiUrl + '/student/jeeData'
    )
  }
  neetData(): Observable<NeetData> {
    return this.http.get<NeetData>(
      environment.trinityApiUrl + '/student/neetData'
    )
  }
  checkNew(): Observable<{ isNew: boolean; name: string }> {
    return this.http.get<{ isNew: boolean; name: string }>(
      environment.trinityApiUrl + '/student/checkNew'
    )
  }
  newStudentPost(formData: {
    name: string
    phoneNumber: number
    prep: string
  }) {
    return this.http.post(
      environment.trinityApiUrl + '/student/newStudentPost',
      formData
    )
  }
  pdfData(query: string): Observable<{
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
  }> {
    return this.http.get<{
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
    }>(environment.trinityApiUrl + '/notes/pdfs' + query)
  }
  pdfDownload(url: string): Observable<void> {
    return this.http
      .get(environment.trinityApiUrl + '/notes/pdf/' + url, {
        responseType: 'blob',
      })
      .pipe(
        map((data: Blob) => {
          const downloadLink = document.createElement('a')
          downloadLink.href = URL.createObjectURL(data)
          downloadLink.download = 'notes.pdf'
          downloadLink.click()
          URL.revokeObjectURL(downloadLink.href)
        })
      )
  }
  testList(query: string): Observable<{
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
  }> {
    return this.http.get<{
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
    }>(environment.trinityApiUrl + '/student/getTests' + query)
  }
  gettest(id: string): Observable<{
    name: string
    exam: string
    subject: string
    date: string
    totalQuestions: number
    num: number
    questionIds: [string]
  }> {
    return this.http.get<{
      name: string
      exam: string
      subject: string
      date: string
      totalQuestions: number
      num: number
      questionIds: [string]
    }>(environment.trinityApiUrl + '/student/getTest/' + id)
  }
  getquestion(query: string): Observable<{
    questionText: string
    options: [string]
    img: string
  }> {
    return this.http.get<{
      questionText: string
      options: [string]
      img: string
    }>(environment.trinityApiUrl + '/student/getQuestion' + query)
  }
  getnquestion(query: string): Observable<{
    questionText: string
    options: [string]
    img: string
  }> {
    return this.http.get<{
      questionText: string
      options: [string]
      img: string
    }>(environment.trinityApiUrl + '/student/getnQuestion' + query)
  }
  sendResult(
    testId: string,
    choosenOption: [number],
    time: number
  ): Observable<{ _id: string }> {
    return this.http.post<{ _id: string }>(
      environment.trinityApiUrl + '/student/result',
      { testId: testId, choosenOption: choosenOption, time: time }
    )
  }
  resultList(query: string): Observable<{
    error: boolean
    total: number
    page: number
    limit: number
    results: [
      {
        name: string
        date: string
        _id: string
        marks: number
      }
    ]
    pageno: [number]
  }> {
    return this.http.get<{
      error: boolean
      total: number
      page: number
      limit: number
      results: [
        {
          name: string
          date: string
          _id: string
          marks: number
        }
      ]
      pageno: [number]
    }>(environment.trinityApiUrl + '/student/getResultList' + query)
  }
  getresult(id: string): Observable<{
    test: {
      exam: string
      questionIds: [string]
      totalQuestions: number
      answers: [number]
        num:number
    }
    results: {
      name: string
      subject: [string]
      date: string
      marks: number
      correct: [number]
      wrong: [number]
      result: [number]
      time: number
    }
  }> {
    return this.http.get<{
      test: {
        exam: string
        questionIds: [string]
        totalQuestions: number
        answers: [number]
        num:number
      }
      results: {
        name: string
        subject: [string]
        date: string
        marks: number
        correct: [number]
        wrong: [number]
        result: [number]
        time: number
      }
    }>(environment.trinityApiUrl + '/student/getResult/' + id)
  }
  sendContactUsMsg(data:NgForm){
      return this.http.post(environment.trinityApiUrl + '/contactForm',data.value)
  }
}
