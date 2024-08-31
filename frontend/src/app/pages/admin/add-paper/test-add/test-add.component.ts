import { Component , OnInit } from '@angular/core';
import { NgForm } from '@angular/forms'
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs'
import { AdminApiService } from 'src/app/services/admin-api.service'

@Component({
  selector: 'app-test-add',
  templateUrl: './test-add.component.html',
  styleUrl: './test-add.component.scss'
})
export class TestAddComponent implements OnInit {
  exam: string = 'jee'
  subject: string[] = ['math', 'physics', 'chemistry']
  difficulty: string = 'Medium'
  totalQuestions: number = 0
  num: number = 0
  create: boolean = false
  name: string = ''

  createData: FormData[] = []
  questionText: string = ''
  options: [string, string, string, string] = ['', '', '', '']
  correctOption: number = 0
  multipleType: boolean = true
  questionNumber: number = 0
  isCreate: boolean = true
  error = ''
  constructor(private adminApi: AdminApiService ,private router:Router) { }

  ngOnInit(): void { }
  onSubmit(): void {
    if (this.isCreate) {
      this.emptyData()
      this.number = this.totalQuestions
    } else {
      this.generate()
    }
  }
  emptyData(): void {
    if (!this.create) {
      const formData = new FormData()
      formData.append('questionText', '')
      formData.append('options', `["", "", "", ""]`)
      formData.append('correctOption', '0')
      for (let i = 0; i < this.totalQuestions; i++) {
        this.createData[i] = formData
      }
      this.create = true
    }
  }
  Questions(m: string, n: string): void {
    if (m == '') {
      m = '0'
    }
    if (n == '') {
      n = '0'
    }
    this.num = parseInt(n)
    this.totalQuestions = parseInt(m) + this.num
  }
  generate(): void {
    let query: string =
      '?exam=' +
      this.exam +
      '&subject=' +
      JSON.stringify(this.subject) +
      '&difficulty=' +
      this.difficulty +
      '&totalQuestions=' +
      this.totalQuestions +
      '&num=' +
      this.num +
      '&name=' +
      this.name
    this.adminApi.generateTest(query).subscribe(
      (d) => {
        this.router.navigate(['/admin/test/list'])
      }
    )
  }
  number: number = 0
  countArray(): any[] {
    return Array(this.number)
  }
  createArray(img: any): void {
    if (this.multipleType) {
      const formData = new FormData()
      formData.append('questionText', this.questionText)
      formData.append('exam', this.exam)
      formData.append('subject', this.subject[this.subCheck()])
      formData.append('difficulty', this.difficulty)
      formData.append('options', JSON.stringify(this.options))
      formData.append('correctOption', this.correctOption.toString())
      if (img.files.length > 0) {
        formData.append('img', img.files[0])
      } else if (
        this.imgArray[this.questionNumber] !== null ||
        this.imgArray[this.questionNumber] !== undefined
      ) {
        formData.append('img', this.imgArray[this.questionNumber])
      }

      this.createData[this.questionNumber] = formData
    } else {
      const formData = new FormData()
      formData.append('questionText', this.questionText)
      formData.append('subject', this.subject[this.subCheck()])
      formData.append('difficulty', this.difficulty)
      formData.append('correctOption', this.correctOption.toString())
      if (img.files.length > 0) {
        formData.append('img', img.files[0])
      } else if (
        this.imgArray[this.questionNumber] !== null ||
        this.imgArray[this.questionNumber] !== undefined
      ) {
        formData.append('img', this.imgArray[this.questionNumber])
      }
      this.createData[this.questionNumber] = formData
    }
  }
  intCon(s: string): number {
    return parseInt(s)
  }
  previousQuestion(form: NgForm): void {
    if (this.questionNumber > 0) {
      this.questionNumber = this.questionNumber - 1
      this.changeInput(this.questionNumber, form)
    }
    this.checkM()
  }
  nextQuestion(form: NgForm): void {
    if (this.questionNumber < this.totalQuestions - 1) {
      this.questionNumber = this.questionNumber + 1
      this.changeInput(this.questionNumber, form)
    }
    this.checkM()
  }
  public imgName: string = 'No file chosen'
  public imgArray: any[] = []
  changeInput(i: number, form: NgForm): void {
    this.questionText = this.createData[i].get('questionText')!.toString()
    this.options = JSON.parse(this.createData[i].get('options')!.toString())
    this.correctOption = parseInt(
      this.createData[i].get('correctOption')!.toString()
    )
    let img1: any = this.createData[i].get('img')!
    if (img1 instanceof File && img1 !== null) {
      this.imgName = img1.name
      this.imgArray[i] = img1
    } else {
      this.imgName = 'No file chosen'
    }
    form.reset()
  }
  checkM(): void {
    if (this.exam == 'jee') {
      if (this.subject.length == 3) {
        let num1: number = this.num / 3
        if (
          (this.questionNumber < this.totalQuestions / 3 &&
            this.questionNumber >= this.totalQuestions / 3 - num1) ||
          (this.questionNumber < this.totalQuestions / 1.5 &&
            this.questionNumber >= this.totalQuestions / 1.5 - num1) ||
          this.questionNumber >= this.totalQuestions - num1
        ) {
          this.multipleType = false
        } else {
          this.multipleType = true
        }
      } else {
        if (this.questionNumber >= this.totalQuestions - this.num) {
          this.multipleType = false
        } else {
          this.multipleType = true
        }
      }
    }
  }
  subCheck(): number {
    let sub: number = 0
    if (this.subject.length == 3) {
      if (this.questionNumber < this.totalQuestions / 3) {
        sub = 0
      } else if (this.questionNumber < this.totalQuestions / 1.5) {
        sub = 1
      } else {
        sub = 2
      }
    }
    return 0
  }
  checkB(i: number): boolean {
    let num: boolean = false
    if (this.subject.length == 3) {
      if (
        i < this.totalQuestions / 3 &&
        i >= this.totalQuestions / 3 - this.num / 3
      ) {
        num = true
      } else if (
        i < this.totalQuestions / 1.5 &&
        i >= this.totalQuestions / 1.5 - this.num / 3
      ) {
        num = true
      } else if (i >= this.totalQuestions - this.num / 3) {
        num = true
      }
    } else if (i >= this.totalQuestions - this.num) {
      num = true
    }
    return num
  }
  remove(): void {
    this.imgName = 'No file chosen'
    this.imgArray[this.questionNumber] = null
  }
  publish(img: any): void {
    this.createArray(img)
    let questionIds: string[] = []
    let answers: number[] = []
    let observables = []
    for (let i = 0; i < this.totalQuestions; i++) {
      let observable
      if (this.checkB(i)) {
        observable = this.adminApi.addNQuestion(this.createData[i])
      } else {
        observable = this.adminApi.addMQuestion(this.createData[i])
      }
      observables.push(observable)
      answers[i] = parseInt(this.createData[i].get('correctOption')!.toString())
    }
    forkJoin(observables).subscribe((results) => {
      questionIds = results.map((d: any) => d.id)
      let data: {
        name: string
        subject: string
        exam: string
        num: number
        totalQuestions: number
        questionIds: string
        answers: string
      } = {
        name: this.name,
        subject: JSON.stringify(this.subject),
        exam: this.exam,
        num: this.num,
        totalQuestions: this.totalQuestions,
        questionIds: JSON.stringify(questionIds),
        answers: JSON.stringify(answers),
      }
      this.adminApi.createTest(data).subscribe((d) => {
        this.router.navigate(['/admin/test/list'])
      })
    })
  }
}
