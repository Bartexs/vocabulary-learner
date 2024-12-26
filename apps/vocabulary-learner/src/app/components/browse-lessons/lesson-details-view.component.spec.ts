import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LessonDetailsViewComponent } from './lesson-details-view.component';

describe('LessonDetailsViewComponent', () => {
  let component: LessonDetailsViewComponent;
  let fixture: ComponentFixture<LessonDetailsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LessonDetailsViewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LessonDetailsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
