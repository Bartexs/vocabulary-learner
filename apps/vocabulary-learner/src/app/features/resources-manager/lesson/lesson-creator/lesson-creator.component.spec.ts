import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LessonCreatorComponent } from '@vocabulary-learner/features/resources-manager/lesson/lesson-creator/lesson-creator.component'

describe('LessonCreatorComponent', () => {
  let component: LessonCreatorComponent;
  let fixture: ComponentFixture<LessonCreatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LessonCreatorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LessonCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
