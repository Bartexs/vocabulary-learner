import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WritingFlashcardComponent } from './writing-flashcard.component';

describe('WritingFlashcardComponent', () => {
  let component: WritingFlashcardComponent;
  let fixture: ComponentFixture<WritingFlashcardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WritingFlashcardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WritingFlashcardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
