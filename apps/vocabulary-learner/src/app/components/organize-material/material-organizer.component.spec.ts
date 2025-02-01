import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialOrganizerComponent } from './material-organizer.component';

describe('MaterialOrganizerComponent', () => {
  let component: MaterialOrganizerComponent;
  let fixture: ComponentFixture<MaterialOrganizerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaterialOrganizerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MaterialOrganizerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
