import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SessionSummaryExamComponent } from './session-summary-exam.component';

describe('SessionSummaryExamComponent', () => {
  let component: SessionSummaryExamComponent;
  let fixture: ComponentFixture<SessionSummaryExamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SessionSummaryExamComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SessionSummaryExamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
