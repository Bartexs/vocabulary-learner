import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConnectFlashcardSidesExerciseComponent } from './connect-flashcard-sides-exercise.component';

describe('ConnectFlashcardSidesExerciseComponent', () => {
  let component: ConnectFlashcardSidesExerciseComponent;
  let fixture: ComponentFixture<ConnectFlashcardSidesExerciseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConnectFlashcardSidesExerciseComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ConnectFlashcardSidesExerciseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
