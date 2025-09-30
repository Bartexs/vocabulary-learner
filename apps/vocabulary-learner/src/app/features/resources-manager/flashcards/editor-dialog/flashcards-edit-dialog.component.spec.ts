import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FlashcardsEditDialogComponent } from './flashcards-edit-dialog.component';

describe('FlashcardsEditDialogComponent', () => {
  let component: FlashcardsEditDialogComponent;
  let fixture: ComponentFixture<FlashcardsEditDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlashcardsEditDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FlashcardsEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
