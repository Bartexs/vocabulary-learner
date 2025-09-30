import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RemoveObjectDialogComponent } from './remove-object-dialog.component';

describe('RemoveObjectDialogComponent', () => {
  let component: RemoveObjectDialogComponent;
  let fixture: ComponentFixture<RemoveObjectDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RemoveObjectDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RemoveObjectDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
