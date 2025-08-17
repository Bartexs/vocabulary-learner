import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicExerciseComponent } from '../../../features/exercises/dynamic-exercise.component';
import { ExerciseService } from '../../../features/exercises/exercise.service';
import { Exercise, ExerciseType } from '../../../core/models/exercise';
import { Flashcard } from '../../../core/models/flashcard';
import { UtilsService } from '../../../core/services/utils.service';

@Component({
  selector: 'app-answer-chosing-timed',
  imports: [CommonModule],
  templateUrl: './answer-chosing-timed.component.html',
  styleUrl: './answer-chosing-timed.component.css',
})

// <!-- 5 rund -> najpierw , 
// (I Runda) po dwie opcje każde słówko,
// (II Runda) po trzy opcje każde słówko,
//  (III Runda) po 4 opcje każde słówko, potem kolejne 5 fiszek i na koniec cały batch po 4 opcje  -->

export class AnswerChosingTimedComponent extends DynamicExerciseComponent implements OnInit, AfterViewInit {
  private exercise: ExerciseType = Exercise.AnswerChosingTimed;
  flashcardBatch: Flashcard[] = [];
  definitionList: Flashcard[] = [];
  isShowConcept = false;
  batchIndex = 0;
  difficultyLevel = 1;
  maxDifficultyLevel = 3;
  batchSize = 5;
  batchBeginningIndex = 0;

  constructor(
    private exerciseService: ExerciseService,
    private utilsService: UtilsService,
  ) {
    super();
  }
  
  ngOnInit() {
    this.currentFlashcard = this.flashcardList[this.currentFlashcardIndex];
    this.exerciseSummary = this.exerciseService.initializeExerciseSummary(this.exercise);
    this.flashcardBatch = this.getNextChunk(this.flashcardList, this.batchSize);
  }

  ngAfterViewInit() {
    this.countdown();
  }

  countdown() {
    setTimeout(() => {
      if (this.isLastFlashcardInBatch()) {
        this.resetBatchIndex();
        this.setShuffledDefinitionList();
        this.isShowConcept = true;
        return;
      } else {
        this.countdown(); // Recursively call countdown
        this.moveToNextFlashcardInBatch();
      }
    }, 5000); // 5 seconds
  }

  isLastFlashcardInBatch() {
    return this.batchIndex + 1 >= this.flashcardBatch.length;
  }

  moveToNextFlashcardInBatch() {
    this.batchIndex++; 
    this.currentFlashcard = this.flashcardBatch[this.batchIndex];
  }

  setShuffledDefinitionList() {
    const definitionList = this.utilsService.getRandomFlashcards(this.flashcardList, this.difficultyLevel);
    definitionList.push(this.currentFlashcard);
    this.definitionList = this.utilsService.shuffleArray(definitionList);
  }

  check(flashcardClicked: Flashcard) {
    if(this.isLastFlashcardInBatch()) {
      if(this.difficultyLevel === this.maxDifficultyLevel) {
        this.moveToNextBatch(); 
      } else {
        this.difficultyLevel++;
        this.resetBatchIndex();
        return;
      }
    };
    this.moveToNextFlashcardInBatch();
    this.setShuffledDefinitionList();
  }

  resetBatchIndex() {
    this.batchIndex = 0;
    this.currentFlashcard = this.flashcardBatch[this.batchIndex];
    this.setShuffledDefinitionList();
  }

  moveToNextBatch() {
    this.flashcardBatch = this.getNextChunk(this.flashcardList, this.batchSize);
    this.cleanForNewBatch();
    this.countdown();
  }

  cleanForNewBatch() {
    this.batchIndex = 0;
    this.difficultyLevel = 1;
    this.isShowConcept = false;
  }

  handleKeyPress(flashcardClicked: Flashcard, keyPressed: number) {
    console.log(flashcardClicked);
    console.log(keyPressed);
  }

  getNextChunk<T>(array: T[], chunkSize: number): T[] {
    if (array.length === 0 || chunkSize <= 0) return [];

    const chunk = array.slice(this.batchBeginningIndex, this.batchBeginningIndex + chunkSize);
    this.batchBeginningIndex += chunkSize;

    // Reset index when the end is reached
    if (this.batchBeginningIndex >= array.length) {
      this.finishExercise();
    }

    return chunk;
  }
}
