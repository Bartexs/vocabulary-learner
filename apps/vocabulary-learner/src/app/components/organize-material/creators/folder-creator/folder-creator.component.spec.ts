import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FolderCreatorComponent } from './folder-creator.component';

describe('FolderCreatorComponent', () => {
  let component: FolderCreatorComponent;
  let fixture: ComponentFixture<FolderCreatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FolderCreatorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FolderCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
