import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AnswerChosingTimedComponent } from './answer-chosing-timed.component';

describe('AnswerChosingTimedComponent', () => {
  let component: AnswerChosingTimedComponent;
  let fixture: ComponentFixture<AnswerChosingTimedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnswerChosingTimedComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AnswerChosingTimedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
