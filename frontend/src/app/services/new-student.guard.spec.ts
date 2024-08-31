import { TestBed } from '@angular/core/testing';

import { NewStudentGuard } from './new-student.guard';

describe('NewStudentGuard', () => {
  let guard: NewStudentGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(NewStudentGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
