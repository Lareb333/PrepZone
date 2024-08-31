import { NgModule } from '@angular/core';
import { BeforeCommaPipe } from 'src/app/services/before-comma.pipe';
import { NgChartsModule } from 'ng2-charts';
import { FormsModule } from '@angular/forms';
import { StudentComponent } from './student.component';
import { LoginCallbackComponent } from '../login-callback/login-callback.component';
import { StudentDashboardComponent } from './student-dashboard/student-dashboard.component';
import { StudentTestComponent } from './student-test/student-test.component';
import { StudentNotesComponent } from './student-notes/student-notes.component';
import { StudentSettingsComponent } from './student-settings/student-settings.component';
import { NeetDashboardComponent } from './student-dashboard/neet-dashboard/neet-dashboard.component';
import { JeeDashboardComponent } from './student-dashboard/jee-dashboard/jee-dashboard.component';
import { StudentResultComponent } from './student-result/student-result.component';
import { StudentTestListComponent } from './student-test/student-test-list/student-test-list.component';
import { StudentGiveTestComponent } from './student-test/student-give-test/student-give-test.component';
import { StudentResultListComponent } from './student-result/student-result-list/student-result-list.component';
import { StudentResultDetailComponent } from './student-result/student-result-detail/student-result-detail.component';
import { MathjaxModule } from 'mathjax-angular';
import { StudentRoutingModule } from './student-routing.module';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    StudentComponent,
    LoginCallbackComponent,
    StudentDashboardComponent,
    StudentTestComponent,
    StudentNotesComponent,
    StudentSettingsComponent,
    NeetDashboardComponent,
    JeeDashboardComponent,
    StudentResultComponent,
    StudentTestListComponent,
    StudentGiveTestComponent,
    BeforeCommaPipe,
    StudentResultListComponent,
    StudentResultDetailComponent,
  ],
  imports: [
    CommonModule,
    StudentRoutingModule,
    NgChartsModule,
    FormsModule,
    MathjaxModule.forRoot({
      config: {
        loader: {
          load: ['output/svg', '[tex]/require', '[tex]/ams'],
        },
        tex: {
          inlineMath: [
            ['\\(', '\\)'],
            ['$', '$'],
          ],
          displayMath: [['$$', '$$']],
          packages: ['base', 'require', 'ams'],
        },
        svg: { fontCache: 'global' },
      },
      src: 'https://cdn.jsdelivr.net/npm/mathjax@3.2.2/es5/startup.js',
    }),
  ],
  providers:[],
  bootstrap: [StudentComponent],
})
export class StudentModule { }
