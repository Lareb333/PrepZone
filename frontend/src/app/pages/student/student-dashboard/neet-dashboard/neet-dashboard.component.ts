import { Component, OnInit } from '@angular/core'
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api.service'
import { NeetData } from 'src/app/services/neetData.interface'

@Component({
  selector: 'app-neet-dashboard',
  templateUrl: './neet-dashboard.component.html',
  styleUrls: ['./neet-dashboard.component.scss'],
})
export class NeetDashboardComponent implements OnInit {
  data$: Observable<NeetData> | undefined;
  constructor(private api: ApiService) { }
  ngOnInit(): void {
    this.data$ = this.api.neetData();
  }
  getOverollAccuracy(i: number, j: number, k: number): number {
    return Math.floor((i + j + k) / 3);
  }
  roundOff(i: number): number {
    return Math.floor(i);
  }
}

