import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditFolderDialogComponent } from './edit-folder-dialog.component';

describe('EditFolderDialogComponent', () => {
  let component: EditFolderDialogComponent;
  let fixture: ComponentFixture<EditFolderDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditFolderDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EditFolderDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
