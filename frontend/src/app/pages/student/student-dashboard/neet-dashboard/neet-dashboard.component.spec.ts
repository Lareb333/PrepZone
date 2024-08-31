import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NeetDashboardComponent } from './neet-dashboard.component';

describe('NeetDashboardComponent', () => {
  let component: NeetDashboardComponent;
  let fixture: ComponentFixture<NeetDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NeetDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NeetDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
