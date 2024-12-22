import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LessonListViewComponent } from './lesson-list-view.component';

describe('LessonListViewComponent', () => {
  let component: LessonListViewComponent;
  let fixture: ComponentFixture<LessonListViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LessonListViewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LessonListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
