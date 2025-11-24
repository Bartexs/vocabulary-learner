import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ExerciseType, getExercises } from '../../../../../core/models/exercise';
import { LearningSessionConfigService } from '../../../../../shared/services/learning-session-config-service/learning-session-config.service';
import { CdkDrag, CdkDragDrop, CdkDropList } from '@angular/cdk/drag-drop';
import { MatIcon } from "@angular/material/icon";
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-exercise-selector',
  standalone: true,
  imports: [CommonModule, MatCheckboxModule, CdkDropList, CdkDrag, MatIcon, ReactiveFormsModule],
  templateUrl: './exercise-selector.component.html',
  styleUrls: ['./exercise-selector.component.css'],
})
export class ExerciseSelectorComponent implements OnInit {
  exerciseContainer: (ExerciseType & { control: FormControl })[] = [];

  constructor(private sessionConfigService: LearningSessionConfigService) {}

  ngOnInit() {
    this.exerciseContainer = getExercises().map(ex => ({
      ...ex,
      control: new FormControl(false)
    }));

    // Subscribe individually to each control
    this.exerciseContainer.forEach(item => {
      item.control.valueChanges.subscribe(() => {
        this.reorderItems();
      });
    });
  }

  // Reorder items: checked items stay on top, unchecked at the bottom
  reorderItems() {
    const checkedItems = this.exerciseContainer.filter(i => i.control.value);
    const uncheckedItems = this.exerciseContainer.filter(i => !i.control.value);

    this.exerciseContainer = [...checkedItems, ...uncheckedItems];

    // Update service with currently selected exercises
    this.updatePracticeModeConfig(checkedItems);
  }

  drop(event: CdkDragDrop<(ExerciseType & { control: FormControl })[]>) {
    if (event.previousIndex !== event.currentIndex) {
      // Swap items in container
      [this.exerciseContainer[event.previousIndex], this.exerciseContainer[event.currentIndex]] =
        [this.exerciseContainer[event.currentIndex], this.exerciseContainer[event.previousIndex]];

      // Automatically check the moved item
      const movedItem = this.exerciseContainer[event.currentIndex];
      movedItem.control.setValue(true, { emitEvent: false });
    }

    // Reorder after drop to enforce checked on top, unchecked at bottom
    this.reorderItems();
  }

  updatePracticeModeConfig(selected: ExerciseType[]) {
    console.log(selected);
    this.sessionConfigService.updateConfig({ exerciseList: selected });
  }
}
