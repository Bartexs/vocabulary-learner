import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WritingExerciseComponent } from './writing-exercise.component';

describe('WritingExerciseComponent', () => {
  let component: WritingExerciseComponent;
  let fixture: ComponentFixture<WritingExerciseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WritingExerciseComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WritingExerciseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
