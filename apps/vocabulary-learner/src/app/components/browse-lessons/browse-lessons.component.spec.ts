import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowseLessonsComponent } from './browse-lessons.component';

describe('BrowseLessonsComponent', () => {
  let component: BrowseLessonsComponent;
  let fixture: ComponentFixture<BrowseLessonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrowseLessonsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BrowseLessonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
