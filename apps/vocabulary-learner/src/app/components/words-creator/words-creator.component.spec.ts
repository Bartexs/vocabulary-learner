import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WordsCreatorComponent } from './words-creator.component';

describe('WordsCreatorComponent', () => {
  let component: WordsCreatorComponent;
  let fixture: ComponentFixture<WordsCreatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WordsCreatorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WordsCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
