import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LessonsByFolderComponent } from './lessons-by-folder.component';

describe('LessonsByFolderComponent', () => {
  let component: LessonsByFolderComponent;
  let fixture: ComponentFixture<LessonsByFolderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LessonsByFolderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LessonsByFolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
