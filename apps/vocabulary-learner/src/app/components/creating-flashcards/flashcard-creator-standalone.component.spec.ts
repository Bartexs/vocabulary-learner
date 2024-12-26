import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FlashcardCreatorStandaloneComponent } from './flashcard-creator-standalone.component';

describe('FlashcardCreatorStandaloneComponent', () => {
  let component: FlashcardCreatorStandaloneComponent;
  let fixture: ComponentFixture<FlashcardCreatorStandaloneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlashcardCreatorStandaloneComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FlashcardCreatorStandaloneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
