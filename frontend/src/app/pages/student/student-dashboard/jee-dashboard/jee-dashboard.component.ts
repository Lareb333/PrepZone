import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { JeeData } from 'src/app/services/jeeData.interface';

@Component({
  selector: 'app-jee-dashboard',
  templateUrl: './jee-dashboard.component.html',
  styleUrls: ['./jee-dashboard.component.scss'],
})
export class JeeDashboardComponent implements OnInit {
  data$: Observable<JeeData> | undefined;
  constructor(private api: ApiService) { }
  ngOnInit(): void {
    this.data$ = this.api.jeeData();
  }
  getOverollAccuracy(i: number, j: number, k: number): number {
    return Math.floor((i + j + k) / 3);
  }
  roundOff(i: number): number {
    return Math.floor(i);
  }
}
