import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FlashcardCreatorBundleComponent } from './flashcard-creator-bundle.component';

describe('FlashcardCreatorBundleComponent', () => {
  let component: FlashcardCreatorBundleComponent;
  let fixture: ComponentFixture<FlashcardCreatorBundleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlashcardCreatorBundleComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FlashcardCreatorBundleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
