import { Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Observable, Subscription } from 'rxjs'
import { ApiService } from 'src/app/services/api.service'
import { trigger, state, style, animate, transition } from '@angular/animations'
import { environment } from 'src/environments/environment'

@Component({
  selector: 'app-student-give-test',
  templateUrl: './student-give-test.component.html',
  styleUrls: ['./student-give-test.component.scss'],
  animations: [
    trigger('in', [
      transition(':enter', [
        style({ height: 0, opacity: 0 }),
        animate('100ms 50ms ease-in', style({ height: '*', opacity: 1 })),
      ]),
      transition(':leave', [
        style({ height: '*', opacity: 0 }),
        animate('50ms ease-in', style({ height: 0, opacity: 0 })),
      ]),
    ]),
  ],
})
export class StudentGiveTestComponent implements OnInit, OnDestroy {
  public testData: {
    name: string
    exam: string
    subject: string
    date: string
    totalQuestions: number
    num: number
    questionIds: [string]
  } = {
      name: '',
      exam: '',
      subject: '',
      date: '',
      num: 0,
      totalQuestions: 0,
      questionIds: [''],
    }
  testId: string = ''
  public questionData$:
    | Observable<{
      questionText: string
      options: [string]
      img: string
    }>
    | undefined
  public query: string = ''
  public subscription: Subscription = new Subscription()
  public index1: number = 0
  public choosenOption: [number] = [999]
  public mul: number = 0
  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private router: Router
  ) { }
  public apiurl: string = environment.trinityApiUrl + '/student/getImg/'
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const idFromUrl = params.get('id')
      this.testId = idFromUrl !== null ? idFromUrl : ''
    })
    this.getTest()
    this.start()
  }
  cancelTest(): void {
    this.router.navigate(['student/test/list'])
  }
  public subIndex: number = 0
  getTest(): void {
    this.subscription = this.api.gettest(this.testId).subscribe(
      (data) => {
        this.testData = data
        this.mul = this.testData.totalQuestions - this.testData.num
        for (let i = 0; i < data.totalQuestions; i++) {
          this.choosenOption.push(999)
        }
        if (this.testData.subject.length == 3) {
          this.tindexs[0] =
            this.testData.totalQuestions / 3 - this.testData.num / 3
          this.tindexs[1] =
            this.tindexs[0] + this.mul / 3 + this.testData.num / 3
          this.tindexs[2] = this.testData.totalQuestions - this.testData.num / 3
        } else {
          this.sindexs = this.mul
        }
        this.getQuestion()
      },
      (error) => {
        console.error('Error:', error)
      }
    )
  }
  public tindexs: [number, number, number] = [0, 0, 0]
  public sindexs: number = 0
  getQuestion(): void {
    const { exam, subject, totalQuestions, questionIds } = this.testData

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
        if (this.index1 < first) {
          this.questionData$ = this.api.getquestion(query)
        } else {
          this.questionData$ = this.api.getnquestion(query)
          this.checkM()
        }
      } else if (this.index1 < totalQuestions / 1.5) {
        this.subIndex = 1
        subjectParam = subject[this.subIndex] || ''
        query = `?exam=${exam}&subject=${subjectParam}&id=${questionIdParam}`
        if (this.index1 < second) {
          this.questionData$ = this.api.getquestion(query)
        } else {
          this.questionData$ = this.api.getnquestion(query)
          this.checkM()
        }
      } else {
        this.subIndex = 2
        subjectParam = subject[this.subIndex] || ''
        query = `?exam=${exam}&subject=${subjectParam}&id=${questionIdParam}`
        if (this.index1 < third) {
          this.questionData$ = this.api.getquestion(query)
        } else {
          this.questionData$ = this.api.getnquestion(query)
          this.checkM()
        }
      }
    } else {
        if (this.index1 < this.mul) {
          this.questionData$ = this.api.getquestion(query)
        } else {
          this.questionData$ = this.api.getnquestion(query)
          this.checkM()
        }
    }
  }
  private timer: any
  private isRunning: boolean = false
  public timeDisplay: string = '00:00:00'

  elapsedTime: number = 0
  start() {
    if (!this.isRunning) {
      this.isRunning = true
      const startTime = Date.now() - (this.timer || 0)
      this.timer = setInterval(() => {
        const currentTime = Date.now()
        const elapsedTime = currentTime - startTime
        this.elapsedTime = elapsedTime / 1000
        this.timeDisplay = this.msToTime(elapsedTime)
      }, 10)
    }
  }

  stop() {
    clearInterval(this.timer)
    this.isRunning = false
  }

  reset() {
    this.stop()
    this.timeDisplay = '00:00:00'
  }

  private msToTime(duration: number) {
    const milliseconds = Math.floor((duration % 1000) / 10)
    const seconds = Math.floor((duration / 1000) % 60)
    const minutes = Math.floor((duration / (1000 * 60)) % 60)
    const hours = Math.floor((duration / (1000 * 60 * 60)) % 24)

    return (
      this.formatTime(hours) +
      ':' +
      this.formatTime(minutes) +
      ':' +
      this.formatTime(seconds)
    )
  }

  private formatTime(time: number) {
    return time < 10 ? '0' + time : time.toString()
  }
  previousQuestion(f: HTMLAnchorElement): void {
    if (this.index1 > 0) {
      this.index1 = this.index1 - 1
      this.getQuestion()
    }
  }
  nextQuestion(f: HTMLAnchorElement): void {
    if (this.index1 < this.testData.totalQuestions - 1) {
      this.index1 = this.index1 + 1
      this.getQuestion()
    }
  }
  ngOnDestroy() {
    this.subscription.unsubscribe()
    this.stop()
  }
  private isResult: boolean = true
  makeResult(): void {
    if (this.isResult) {
      this.isResult = false
      this.stop()
      this.api
        .sendResult(this.testId, this.choosenOption, this.elapsedTime)
        .subscribe(
          (response) => {
            this.router.navigate(['student/result/' + response._id])
          },
          (error) => {
            console.error('Error updating data:', error)
          }
        )
    }
  }
  goSubject(): void {
    switch (this.subIndex) {
      case 0:
        this.index1 = 0
        break
      case 1:
        this.index1 = this.testData.totalQuestions / 3
        break
      case 2:
        this.index1 = this.testData.totalQuestions / 1.5
        break
      default:
        this.index1 = 0
    }
    this.getQuestion()
  }
  public inputValue: [string] = ['']
  onInputChange() {
    if (
      (this.inputValue[this.index1] == '' &&
        this.inputValue[this.index1] != '0') ||
      this.inputValue[this.index1] == null
    ) {
      this.choosenOption[this.index1] = 999
    } else {
      this.choosenOption[this.index1] = parseFloat(this.inputValue[this.index1])
    }
  }
  public disabled1 = true
  checkM(): void {
    if (this.testData.subject.length == 3) {
      let num1: number = this.testData.num / 3
      if (this.index1 < this.tindexs[0] + num1) {
        this.disabled1 = this.halfEqualTo999(
          this.choosenOption,
          this.tindexs[0],
          this.tindexs[0] + num1
        )
      } else if (this.index1 < this.tindexs[1] + num1) {
        this.disabled1 = this.halfEqualTo999(
          this.choosenOption,
          this.tindexs[1],
          this.tindexs[1] + num1
        )
      } else if (this.index1 < this.tindexs[2] + num1) {
        this.disabled1 = this.halfEqualTo999(
          this.choosenOption,
          this.tindexs[2],
          this.tindexs[2] + num1
        )
      }
    } else {
      this.disabled1 = this.halfEqualTo999(
        this.choosenOption,
        this.sindexs,
        this.sindexs + this.testData.num
      )
    }
  }
  halfEqualTo999(arr: number[], x: number, y: number): boolean {
    if (x < 0 || y >= arr.length || x > y) {
      throw new Error(
        'Invalid input: x and y must be valid indices within the array.'
      )
    }

    const elementsInRange = y - x
    const elementsEqualTo999 = arr
      .slice(x, y)
      .filter((element) => element === 999).length

    return elementsEqualTo999 > Math.ceil(elementsInRange / 2)
  }
}
