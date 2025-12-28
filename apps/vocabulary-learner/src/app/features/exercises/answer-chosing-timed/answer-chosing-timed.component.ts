import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicExerciseComponent } from '../../../features/exercises/dynamic-exercise.component';
import { Exercise, ExerciseType } from '../../../core/models/exercise';
import { Flashcard } from '../../../core/models/flashcard';
import { UtilsService } from '../../../core/services/utils.service';
import { SessionSummaryService } from '../../session-summary/session-summary.service';
import { PracticeService } from '../../training-modes/practice/services/practice.service';
import { LearningSessionConfigService } from '@vocabulary-learner/shared/services/learning-session-config-service/learning-session-config.service';

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
  protected override exerciseType: ExerciseType = Exercise.AnswerChosingTimed;
  flashcardBatch: Flashcard[] = [];
  definitionList: Flashcard[] = [];
  isShowConcept = false;
  batchIndex = 0;
  difficultyLevel = 1;
  maxDifficultyLevel = 3;
  batchSize = 5;
  batchBeginningIndex = 0;
  timeCounter = 5;
  isShowResult = false;
  isCorrect = false;

  constructor(
    protected override practiceService: PracticeService,
    protected override sessionConfigService: LearningSessionConfigService,
    protected sessionSummaryService: SessionSummaryService,
    private utilsService: UtilsService,
  ) {
    super(practiceService, sessionSummaryService, sessionConfigService);
    this.summary = this.sessionSummary.initSummary(this.exerciseType);
  }
  
  ngOnInit() {
    this.currentFlashcard = this.flashcardList[this.currentFlashcardIndex];
    this.flashcardBatch = this.getNextChunk(this.flashcardList, this.batchSize);
  }

  ngAfterViewInit() {
    this.countdown();
  }

  countdown() {
    this.timeCounter = 5; // reset for each flashcard
    const intervalId = setInterval(() => {
      this.timeCounter--;

      if (this.timeCounter < 0) {
        clearInterval(intervalId); // stop countdown
        if (this.isLastFlashcardInBatch()) {
          this.resetBatchIndex();
          this.setShuffledDefinitionList();
          this.isShowConcept = true;
        } else {
          this.moveToNextFlashcardInBatch();
          this.countdown(); // start next flashcard countdown
        }
      }
    }, 1000); // every 1 second
  }

  isLastFlashcardInBatch() {
    return this.batchIndex + 1 >= this.flashcardBatch.length;
  }

  moveToNextFlashcardInBatch() {
    this.isShowResult = false;
    if(this.isLastFlashcardInBatch()) {
      if(this.difficultyLevel === this.maxDifficultyLevel) {
        this.moveToNextBatch(); 
      } else {
        this.difficultyLevel++;
        this.resetBatchIndex();
        return;
      }
    };

    this.batchIndex++; 
    this.currentFlashcard = this.flashcardBatch[this.batchIndex];
    
    this.setShuffledDefinitionList();
  }

  setShuffledDefinitionList() {
    const indices: Set<number> = new Set();

    // Add correct flashcard to skip duplicates in options
    indices.add(this.flashcardList.indexOf(this.currentFlashcard));

    // Get array filled with answer options
    const definitionList = this.utilsService.getRandomFlashcards(this.flashcardList, this.difficultyLevel, indices);
    this.definitionList = this.utilsService.shuffleArray(definitionList);
  }

  checkAnswer(flashcardClicked: Flashcard) {
    if(!this.isShowResult) {  
      this.isShowResult = true;
      this.isCorrect = this.currentFlashcard === flashcardClicked;
      this.summary = this.sessionSummaryService.modifySummary(flashcardClicked, this.isCorrect, this.summary);
    }
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
