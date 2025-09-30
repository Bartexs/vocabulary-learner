import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FlashcardsCreatorDialogComponent } from './flashcards-creator-dialog.component';

describe('FlashcardsCreatorDialogComponent', () => {
  let component: FlashcardsCreatorDialogComponent;
  let fixture: ComponentFixture<FlashcardsCreatorDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlashcardsCreatorDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FlashcardsCreatorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
