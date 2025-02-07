import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LessonDetailsViewerComponent } from './lesson-details-viewer.component';

describe('LessonDetailsViewerComponent', () => {
  let component: LessonDetailsViewerComponent;
  let fixture: ComponentFixture<LessonDetailsViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LessonDetailsViewerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LessonDetailsViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
