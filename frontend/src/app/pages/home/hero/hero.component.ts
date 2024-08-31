import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }
  login(){
    this.router.navigate(['logincallback'])
  }
  navigate(fregment: string): void {
    this.router.navigateByUrl('' + fregment)
  }
}
