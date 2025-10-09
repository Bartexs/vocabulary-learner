import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Flashcard } from '../../core/models/flashcard';
import { Folder } from '../../core/models/folder';
import { DateUtilsService } from '../../core/services/date-utils.service';
import { FlashcardService } from '../../core/services/flashcard.service';
import { LessonService } from '../../core/services/lesson.service';
import { RouterLink } from "@angular/router";

interface FolderWithFlashcards {
  folder: Folder,
  flashcardList: Flashcard[],
  newMaterial: Flashcard[];
  repetitionMaterial: Flashcard[],
}

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})

export class HomeComponent {
  isPracticeDisabled = false;
}
