import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudyMaterialManagerService } from './study-material-manager.service';
import { Folder } from '../../core/models/folder/folder';
import { MatIcon } from "@angular/material/icon";
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-study-material-manager',
  imports: [CommonModule, MatIcon, MatProgressSpinnerModule, RouterLink],
  templateUrl: './study-material-manager.component.html',
  styleUrl: './study-material-manager.component.css',
})
export class StudyMaterialManagerComponent {
  folders: Folder[] = [];
  isLoading = true;

  constructor(private studyMaterialManagerService: StudyMaterialManagerService) {
    this.addUserFolder();
    this.getUserFolders();
  }

  getUserFolders() {
    this.studyMaterialManagerService.getUserFolders().subscribe((folders) => {
      this.folders = folders;
      this.isLoading = false;
    });
  }

  addUserFolder() {
    const folder: Folder = {
      id: 1,
      name: 'test1',
      lessonList: []
    };

    this.studyMaterialManagerService.addUserFolder(folder).subscribe((res) => {
      console.log(res);
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
