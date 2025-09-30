import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FoldersViewerComponent } from './folders-viewer';

describe('StudyMaterialManagerComponent', () => {
  let component: FoldersViewerComponent;
  let fixture: ComponentFixture<FoldersViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FoldersViewerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FoldersViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
