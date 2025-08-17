import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FillBlankSpaceExerciseComponent } from './fill-blank-space-exercise.component';

describe('FillBlankSpaceExerciseComponent', () => {
  let component: FillBlankSpaceExerciseComponent;
  let fixture: ComponentFixture<FillBlankSpaceExerciseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FillBlankSpaceExerciseComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FillBlankSpaceExerciseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
