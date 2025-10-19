import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FoldersDialogComponent } from './folders-dialog.component';

describe('FoldersDialogComponent', () => {
  let component: FoldersDialogComponent;
  let fixture: ComponentFixture<FoldersDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FoldersDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FoldersDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
