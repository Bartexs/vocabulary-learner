import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { PracticeModeConfig } from '../models/practice-mode-config';
import { ExerciseType } from '../../../../core/models/exercise';
import { ExerciseSelectorComponent } from '../resources-configurators/exercise-selector/exercise-selector.component';
import { MaterialSelectorComponent } from '../resources-configurators/material-selector/material-selector.component';
import { PracticeService } from '../services/practice.service';

@Component({
  selector: 'app-practice-mode-selector',
  imports: [CommonModule, MatCheckboxModule, ExerciseSelectorComponent, MaterialSelectorComponent],
  templateUrl: './practice-mode-selector.component.html',
  styleUrl: './practice-mode-selector.component.css',
})
export class PracticeModeSelectorComponent implements OnInit {
  lessonsAndExerciseChosen = false;
  modeType = "PRACTICE";
  practiceModeConfig!: PracticeModeConfig;
  isShowAdvancedSettings = false;

  constructor(
    private router: Router,
    private practiceService: PracticeService,
  ) {
  }

  ngOnInit(): void {
    this.practiceModeConfig = this.practiceService.initializePracticeModeConfig();
  }

  startPractice() {
    this.practiceService.setPracticeModeConfig(this.practiceModeConfig);
    this.router.navigate(['/practice']);
  }

  chosenExercisesChanged(data: ExerciseType[]) {
    this.practiceModeConfig = {
      ...this.practiceModeConfig,
      exerciseList: data
    };
  }
}
