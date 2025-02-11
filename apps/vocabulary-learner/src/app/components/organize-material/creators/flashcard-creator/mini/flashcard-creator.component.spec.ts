import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FlashcardCreatorComponent } from './flashcard-creator.component';

describe('FlashcardCreatorComponent', () => {
  let component: FlashcardCreatorComponent;
  let fixture: ComponentFixture<FlashcardCreatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlashcardCreatorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FlashcardCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
