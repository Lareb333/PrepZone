import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentGiveTestComponent } from './student-give-test.component';

describe('StudentGiveTestComponent', () => {
  let component: StudentGiveTestComponent;
  let fixture: ComponentFixture<StudentGiveTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentGiveTestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentGiveTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
