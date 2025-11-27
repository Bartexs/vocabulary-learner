import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CurrentDayStatisticsComponent } from './current-day-statistics.component';

describe('CurrentDayStatisticsComponent', () => {
  let component: CurrentDayStatisticsComponent;
  let fixture: ComponentFixture<CurrentDayStatisticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CurrentDayStatisticsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CurrentDayStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
