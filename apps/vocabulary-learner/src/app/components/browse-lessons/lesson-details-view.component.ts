import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Lesson } from '../../models/lessons';
import { FlashcardCreatorBundleComponent } from "../creating-flashcards/flashcard-creator-bundle/flashcard-creator-bundle.component";

@Component({
  selector: 'app-lesson-details-view',
  imports: [CommonModule, FlashcardCreatorBundleComponent],
  templateUrl: './lesson-details-view.component.html',
  styleUrl: './lesson-details-view.component.css',
})
export class LessonDetailsViewComponent {
  @Input() lesson!: Lesson;
}
