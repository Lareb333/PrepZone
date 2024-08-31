import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Chart } from 'chart.js';
import { Observable, Subscription } from 'rxjs';
import { AdminApiService } from 'src/app/services/admin-api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-result-info',
  templateUrl: './result-info.component.html',
  styleUrl: './result-info.component.scss'
})
export class ResultInfoComponent implements OnInit{
  studentId: string = '';
  testId: string = '';
  resultId:string =''
  public scoreChart: any
  private apisub: Subscription | undefined
  public resultData: {
    test: {
      exam: string
      questionIds: [string]
      totalQuestions: number
      answers: [number]
      num: number
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
  } = {
      test: {
        exam: '',
        questionIds: [''],
        totalQuestions: 0,
        answers: [0],
        num: 0,
      },
      results: {
        name: '',
        subject: [''],
        date: '',
        marks: 0,
        correct: [0],
        wrong: [0],
        result: [0],
        time: 0,
      },
    }

  constructor(
    private route: ActivatedRoute,
    private api: AdminApiService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const idFromUrl = params.get('id1')
      const idFromUrl1 = params.get('id2')
      const idFromUrl2 = params.get('id3')
      this.studentId = idFromUrl !== null ? idFromUrl : ''
      this.resultId = idFromUrl1 !== null ? idFromUrl1 : ''
      this.testId = idFromUrl2 !== null ? idFromUrl2 : ''
      const query= '?resultId=' + this.resultId + '&studentId=' + this.studentId
      this.apisub = this.api.getresult(query).subscribe(
        (data: any) => {
          this.resultData = data
          this.mul =
            this.resultData.test.totalQuestions - this.resultData.test.num
          let i: number = this.resultData.results.subject.length
          if (i == 3) {
            this.totalMark =12*(this.resultData.test.totalQuestions/3-Math.round(this.resultData.test.num/6))
            this.correct =
              data.results.correct[0] +
              data.results.correct[1] +
              data.results.correct[2]
            this.wrong =
              data.results.wrong[0] +
              data.results.wrong[1] +
              data.results.wrong[2]
          } else {
            this.totalMark =
              4 *
              (this.resultData.test.totalQuestions - Math.round(this.resultData.test.num / 2))
            this.correct = data.results.correct[0]
            this.wrong = data.results.wrong[0]
          }
          this.unattemped = data.test.totalQuestions - this.correct - this.wrong
          this.accuracy = Math.round(
            (this.correct / (this.correct + this.wrong)) * 100
          )
          this.createScoreChart()
          this.getQuestion()
        },
      )
    })
  }
  back(): void {
    this.router.navigate(['/admin/test/resultList/' + this.testId])
  }
  ngOnDestroy(): void {
    this.apisub?.unsubscribe()
  }
  totalMark: number = 0
  correct: number = 0
  wrong: number = 0
  unattemped: number = 0
  accuracy: number = 0
  createScoreChart() {
    this.scoreChart = new Chart('MyChart', {
      type: 'doughnut',
      data: {
        labels: ['Marks Obtained', 'Remaining Marks'],
        datasets: [
          {
            data: [this.correct, this.wrong, this.unattemped],
            backgroundColor: ['#10b981', '#ef4444', '#94a3b8'],
          },
        ],
      },
      options: {
        aspectRatio: 1,
        plugins: {
          legend: {
            display: false,
          },
        },
        cutout: '50%',
      },
    })
  }
  public query: string = ''
  public index1: number = 0
  public mul: number = 0
  public subIndex: number = 0
  public questionData$:
    | Observable<{
      questionText: string
      options: [string]
      img: string
    }>
    | undefined
  public apiurl: string = environment.trinityApiUrl + '/student/getImg/'
  getQuestion(): void {
    const { exam, totalQuestions, questionIds } = this.resultData.test
    const subject = this.resultData.results.subject
    let subjectParam = subject[this.subIndex] || ''
    let questionIdParam = questionIds[this.index1] || ''
    let query = `?exam=${exam}&subject=${subjectParam}&id=${questionIdParam}`
    if (subject.length > 1) {
      let num = (totalQuestions - this.mul) / 3
      let first = this.mul / 3
      let second = first + num + this.mul / 3
      let third = second + num + this.mul / 3
      if (this.index1 < totalQuestions / 3) {
        this.subIndex = 0
        subjectParam = subject[this.subIndex] || ''
        query = `?exam=${exam}&subject=${subjectParam}&id=${questionIdParam}`
        this.questionData$ =
          this.index1 < first
            ? this.api.getquestion(query)
            : this.api.getnquestion(query)
      } else if (this.index1 < totalQuestions / 1.5) {
        this.subIndex = 1
        subjectParam = subject[this.subIndex] || ''
        query = `?exam=${exam}&subject=${subjectParam}&id=${questionIdParam}`
        this.questionData$ =
          this.index1 < second
            ? this.api.getquestion(query)
            : this.api.getnquestion(query)
      } else {
        this.subIndex = 2
        subjectParam = subject[this.subIndex] || ''
        query = `?exam=${exam}&subject=${subjectParam}&id=${questionIdParam}`
        this.questionData$ =
          this.index1 < third
            ? this.api.getquestion(query)
            : this.api.getnquestion(query)
      }
    } else {
      this.questionData$ =
        this.index1 < this.mul
          ? this.api.getquestion(query)
          : this.api.getnquestion(query)
    }
  }
  previousQuestion(f: HTMLAnchorElement): void {
    if (this.index1 > 0) {
      this.index1 = this.index1 - 1
      this.getQuestion()
    }
  }
  nextQuestion(f: HTMLAnchorElement): void {
    if (this.index1 < this.resultData.test.totalQuestions - 1) {
      this.index1 = this.index1 + 1
      this.getQuestion()
    }
  }
  getColor(i: number): string {
    if (
      this.resultData.test.answers[this.index1] ===
      this.resultData.results.result[this.index1] &&
      i === this.resultData.test.answers[this.index1]
    ) {
      return '#10b981'
    } else if (
      i === this.resultData.results.result[this.index1] &&
      this.resultData.test.answers[this.index1] !==
      this.resultData.results.result[this.index1]
    ) {
      return '#ef4444'
    } else if (
      i === this.resultData.test.answers[this.index1] &&
      this.resultData.test.answers[this.index1] !==
      this.resultData.results.result[this.index1]
    ) {
      return '#94a3b8'
    } else {
      return '#d1d5db'
    }
  }
  public inputValue: string = ''
  onInputChange() {
    if (this.resultData.results.result[this.index1] == 999) {
      this.inputValue = 'empty'
    } else {
      this.inputValue = this.resultData.results.result[this.index1].toString()
    }
  }
  mathF(i: number): number {
    return Math.round(i)
  }
}
