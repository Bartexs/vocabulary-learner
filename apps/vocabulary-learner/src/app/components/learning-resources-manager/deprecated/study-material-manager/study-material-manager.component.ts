import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIcon } from "@angular/material/icon";
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterLink } from '@angular/router';
import { StudyMaterialManagerService } from './study-material-manager.service';
import { Folder } from '@vocabulary-learner/core/models/folder';

@Component({
  selector: 'app-study-material-manager',
  imports: [CommonModule, MatIcon, MatProgressSpinnerModule, RouterLink],
  templateUrl: './study-material-manager.component.html',
  styleUrl: './study-material-manager.component.css',
})
export class StudyMaterialManagerComponent {
  folders: Folder[] = [];
  isLoading = true;

  constructor(
    private studyMaterialManagerService: StudyMaterialManagerService,
  ) {
    this.getUserFolders();
  }

  getUserFolders() {
    this.studyMaterialManagerService.getUserFolders().subscribe((folders) => {
      this.folders = folders;
      this.isLoading = false;
    });
  }
  
  removeFolder(index: number) {
    const folder = this.folders[index];

    this.studyMaterialManagerService.removeFolder(folder).subscribe({
      next: () => {
        this.folders = this.folders.filter(f => f.id != folder.id);
      }, 
      error: (err) => {
        console.log('Failed to delete folder', err);
      }
    })
  }


}
