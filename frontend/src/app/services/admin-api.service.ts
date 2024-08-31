import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AdminApiService {
  constructor(private http: HttpClient, private router: Router) {}
  login(data: {
    username: string;
    password: string;
  }): Observable<{ adminToken: string }> {
    return this.http.post<{ adminToken: string }>(
      environment.trinityApiUrl + '/login/admin',
      data
    );
  }
  addMQuestion(formData: FormData): Observable<{ id: string }> {
    return this.http.post<{ id: string }>(
      environment.trinityApiUrl + '/admin/addMQuestion',
      formData
    );
  }
  addNQuestion(formData: FormData): Observable<{ id: string }> {
    return this.http.post<{ id: string }>(
      environment.trinityApiUrl + '/admin/addNQuestion',
      formData
    );
  }
  generateTest(query: string): Observable<void> {
    return this.http.get<void>(
      environment.trinityApiUrl + '/admin/GeneratePaper' + query
    );
  }
  createTest(data: {
    name: string;
    subject: string;
    exam: string;
    num: number;
    totalQuestions: number;
    questionIds: string;
    answers: string;
  }) {
    return this.http.post(
      environment.trinityApiUrl + '/admin/CreatePaper',
      data
    );
  }
  testList(query: string): Observable<{
    error: boolean;
    total: number;
    page: number;
    limit: number;
    tests: [
      {
        name: string;
        exam: string;
        date: string;
        totalQuestions: number;
        _id: string;
      }
    ];
    pageno: [number];
  }> {
    return this.http.get<{
      error: boolean;
      total: number;
      page: number;
      limit: number;
      tests: [
        {
          name: string;
          exam: string;
          date: string;
          totalQuestions: number;
          _id: string;
        }
      ];
      pageno: [number];
    }>(environment.trinityApiUrl + '/admin/getTests' + query);
  }
  deleteTest(id: string) {
    return this.http.get(environment.trinityApiUrl + '/admin/deleteTest/' + id);
  }
  deletePdf(id: string) {
    return this.http.get(environment.trinityApiUrl + '/admin/deletePdf/' + id);
  }
  pdfData(query: string): Observable<{
    error: boolean;
    total: number;
    page: number;
    limit: number;
    pdfs: [
      {
        name: string;
        url: string;
      }
    ];
    pageno: [number];
  }> {
    return this.http.get<{
      error: boolean;
      total: number;
      page: number;
      limit: number;
      pdfs: [
        {
          name: string;
          url: string;
        }
      ];
      pageno: [number];
    }>(environment.trinityApiUrl + '/admin/pdfs' + query);
  }
  pdfDownload(url: string): Observable<void> {
    return this.http
      .get(environment.trinityApiUrl + '/notes/pdf/' + url, {
        responseType: 'blob',
      })
      .pipe(
        map((data: Blob) => {
          const downloadLink = document.createElement('a');
          downloadLink.href = URL.createObjectURL(data);
          downloadLink.download = 'notes.pdf';
          downloadLink.click();
          URL.revokeObjectURL(downloadLink.href);
        })
      );
  }
  uploadPdf(form: FormData) {
    return this.http.post(environment.trinityApiUrl + '/notes', form);
  }
  dashboardData(): Observable<{
    totalStudent: number;
    jeePhysics: number;
    jeeChemistry: number;
    jeeMath: number;
    numPhysics: number;
    numChemistry: number;
    numMath: number;
    neetPhysics: number;
    neetChemistry: number;
    neetBio: number;
  }> {
    return this.http.get<{
      totalStudent: number;
      jeePhysics: number;
      jeeChemistry: number;
      jeeMath: number;
      numPhysics: number;
      numChemistry: number;
      numMath: number;
      neetPhysics: number;
      neetChemistry: number;
      neetBio: number;
    }>(environment.trinityApiUrl + '/admin/dashboard');
  }
  studentData(query: string): Observable<{
    error: boolean;
    total: number;
    page: number;
    limit: number;
    students: [
      {
        name: string;
        topMarks: [number, number];
        averageMarks: [number, number];
        phoneNumber: number;
        prep: string;
        email: string;
        profileImg: string;
      }
    ];
    pageno: [number];
  }> {
    return this.http.get<{
      error: boolean;
      total: number;
      page: number;
      limit: number;
      students: [
        {
          name: string;
          topMarks: [number, number];
          averageMarks: [number, number];
          phoneNumber: number;
          prep: string;
          email: string;
          profileImg: string;
        }
      ];
      pageno: [number];
    }>(environment.trinityApiUrl + '/admin/studentList' + query);
  }
  attemptData(query: string): Observable<{
    error: boolean;
    total: number;
    page: number;
    limit: number;
    students: [
      {
        _id:string
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
  }> {
    return this.http.get<{
      error: boolean;
      total: number;
      page: number;
      limit: number;
      students: [
        {
          _id:string
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
    }>(environment.trinityApiUrl + '/admin/attemptList' + query);
  }
  getresult(query:string): Observable<{
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
    }>(environment.trinityApiUrl + '/admin/getResult' + query )
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
    }>(environment.trinityApiUrl + '/admin/getQuestion' + query)
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
    }>(environment.trinityApiUrl + '/admin/getnQuestion' + query)
  }
}
