import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JeeDashboardComponent } from './jee-dashboard.component';

describe('JeeDashboardComponent', () => {
  let component: JeeDashboardComponent;
  let fixture: ComponentFixture<JeeDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JeeDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JeeDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
