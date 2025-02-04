import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FolderDetailsViewerComponent } from './folder-details-viewer.component';

describe('FolderDetailsViewerComponent', () => {
  let component: FolderDetailsViewerComponent;
  let fixture: ComponentFixture<FolderDetailsViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FolderDetailsViewerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FolderDetailsViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
