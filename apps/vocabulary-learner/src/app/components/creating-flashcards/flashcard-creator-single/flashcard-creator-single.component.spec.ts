import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FlashcardCreatorSingleComponent } from './flashcard-creator-single.component';

describe('FlashcardCreatorSingleComponent', () => {
  let component: FlashcardCreatorSingleComponent;
  let fixture: ComponentFixture<FlashcardCreatorSingleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlashcardCreatorSingleComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FlashcardCreatorSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
