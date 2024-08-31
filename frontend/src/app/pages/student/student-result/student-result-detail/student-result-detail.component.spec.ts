import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentResultDetailComponent } from './student-result-detail.component';

describe('StudentResultDetailComponent', () => {
  let component: StudentResultDetailComponent;
  let fixture: ComponentFixture<StudentResultDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentResultDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentResultDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
