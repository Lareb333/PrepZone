import { NgModule } from '@angular/core'
import { BrowserModule, HammerModule } from '@angular/platform-browser'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { HomeComponent } from './pages/home/home.component'
import { NavbarComponent } from './pages/home/navbar/navbar.component'
import { AdminLoginComponent } from './pages/admin-login/admin-login.component'
import { AdminComponent } from './pages/admin/admin.component'
import { FormsModule } from '@angular/forms'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { NewStudentComponent } from './pages/new-student/new-student.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { CorsInterceptor } from './services/cors.interceptor'
import { HeroComponent } from './pages/home/hero/hero.component';
import { CarouselComponent } from './pages/home/carousel/carousel.component';
import { AboutComponent } from './pages/home/about/about.component'
import { ScrollEffectDirective } from './services/scroll-effect.directive';
import { FooterComponent } from './pages/home/footer/footer.component';
import { ErrorComponent } from './pages/error/error.component'
import { LoadingBarRouterModule } from '@ngx-loading-bar/router'
import { ContactComponent } from './pages/home/contact/contact.component'
import { ServiceComponent } from './pages/home/service/service.component'

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    AdminLoginComponent,
    AdminComponent,
    NewStudentComponent,
    HeroComponent,
    CarouselComponent,
    AboutComponent,
    ScrollEffectDirective,
    FooterComponent,
    ErrorComponent,
    ContactComponent,
    ServiceComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    LoadingBarRouterModule,
    HammerModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CorsInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
