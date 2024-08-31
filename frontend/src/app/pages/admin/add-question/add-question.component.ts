import { OnInit , Component } from '@angular/core'
import { NgForm } from '@angular/forms'
import { AdminApiService } from 'src/app/services/admin-api.service'

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.scss'],
})
export class AddQuestionComponent implements OnInit {
  questionText: string = ''
  options: [string, string, string, string] = ['', '', '', '']
  exam: string = 'jee'
  subject: string = 'physics'
  difficulty: string = 'Medium'
  multipleType: boolean = true
  correctOption: number = 0
  mathEx :string[]= [
    'x^2 + y^2 = r^2$',
    'e^{ipi} + 1 = 0$',
    '\\frac{dy}{dx} = \\sin(x)$',
    'f(x) = \\int_{a}^{b} g(x) \\, dx$',
    '\\sum_{n=1}^{10} n^2$',
    '\\lim_{x\\to\\infty} \\left(1 + \\frac{1}{x}\\right)^x$',
    '\\frac{\\partial f}{\\partial x}$',
    '\\sin^2(x) + \\cos^2(x) = 1$',
    '\\log_b(x) = \\frac{\\log(x)}{\\log(b)}$',
  ]
  mathEx2:string[]=[
    '\\int_{0}^{1} x^2 \\, dx$',
    '\\theta = \\arctan\\left(\\frac{y}{x}\\right)$',
    '\\binom{n}{k} = \\frac{n!}{k!(n-k)!}$',
    '\\lim_{h \\to 0} \\frac{f(x+h) - f(x)}{h}$',
    '\\sin^2(x) = \\frac{1 - \\cos(2x)}{2}$',
    '\\frac{d}{dx}\\left[\\ln(x)\\right] = \\frac{1}{x}$',
    '\\frac{d}{dx}\\left[ \\tan(x) \\right] = \\sec^2(x)$',
    'x = \\frac{-b \\pm \\sqrt{b^2-4ac}}{2a}$',
    'P(A|B) = \\frac{P(A \\cap B)}{P(B)}$',

  ]

  constructor(private adminApi: AdminApiService) {}
  sucess: string = ''
  timeout: boolean = true
  ngOnInit(): void {}
  addQuestion(form: NgForm, img: any): void {
    if (this.timeout) {
      this.timeout = false
      if (this.multipleType) {
        const formData = new FormData()
        formData.append('questionText', this.questionText)
        formData.append('exam', this.exam)
        formData.append('subject', this.subject)
        formData.append('difficulty', this.difficulty)
        formData.append('options',JSON.stringify(this.options))
        formData.append('correctOption', this.correctOption.toString())
        if (img.files.length !== 0) {
          formData.append('img', img.files[0])
        }
        this.adminApi.addMQuestion(formData).subscribe(() => {
          this.sucess = 'Sucessfully Added'
          this.questionText = ''
          this.options = ['', '', '', '']
          this.correctOption = 0
          form.resetForm()
          setTimeout(() => {
            this.sucess = ''
          }, 5000)
        })
      } else {
        const formData = new FormData()
        formData.append('questionText', this.questionText)
        formData.append('subject', this.subject)
        formData.append('difficulty', this.difficulty)
        formData.append('correctOption', this.correctOption.toString())
        if (img.files.length !== 0) {
          formData.append('img', img.files[0])
        }
        this.adminApi.addNQuestion(formData).subscribe(() => {
          this.sucess = 'Sucessfully Added'
          this.questionText = ''
          this.correctOption = 0
          form.resetForm()
          setTimeout(() => {
            this.sucess = ''
          }, 5000)
        })
      }
    }
    setTimeout(() => {
      this.timeout = true
    }, 5000)
  }
  intCon(s: string): number {
    return parseInt(s)
  }
}
