import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WritingExcerciseComponent } from './writing-excercise.component';

describe('WritingExcerciseComponent', () => {
  let component: WritingExcerciseComponent;
  let fixture: ComponentFixture<WritingExcerciseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WritingExcerciseComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WritingExcerciseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
