import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PracticeModeComponent } from '../practice-mode.component';

describe('PracticeModeComponent', () => {
  let component: PracticeModeComponent;
  let fixture: ComponentFixture<PracticeModeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PracticeModeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PracticeModeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
