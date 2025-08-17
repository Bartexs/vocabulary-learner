import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowsingExerciseComponent } from './browsing-exercise.component';

describe('BrowsingExerciseComponent', () => {
  let component: BrowsingExerciseComponent;
  let fixture: ComponentFixture<BrowsingExerciseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrowsingExerciseComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BrowsingExerciseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
