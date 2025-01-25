import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PracticeModeSelectorComponent } from './practice-mode-selector.component';

describe('PracticeModeSelectorComponent', () => {
  let component: PracticeModeSelectorComponent;
  let fixture: ComponentFixture<PracticeModeSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PracticeModeSelectorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PracticeModeSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
