import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StudyMaterialManagerComponent } from './study-material-manager.component';

describe('StudyMaterialManagerComponent', () => {
  let component: StudyMaterialManagerComponent;
  let fixture: ComponentFixture<StudyMaterialManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudyMaterialManagerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StudyMaterialManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
