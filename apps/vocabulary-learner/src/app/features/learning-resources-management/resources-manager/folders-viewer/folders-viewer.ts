import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIcon } from "@angular/material/icon";
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterLink } from '@angular/router';
import { Folder } from '@vocabulary-learner/core/models/folder';
import { FolderService } from '@vocabulary-learner/shared/folder-service/folder.service';

@Component({
  selector: 'app-folders-viewer',
  imports: [CommonModule, MatIcon, MatProgressSpinnerModule, RouterLink],
  templateUrl: './folders-viewer.component.html',
  styleUrl: './folders-viewer.component.css',
})
export class FoldersViewerComponent {
  folders: Folder[] = [];
  isLoading = true;

  constructor(
    private studyMaterialManagerService: FolderService,
  ) {
    this.getUserFolders();
  }

  getUserFolders() {
    this.studyMaterialManagerService.getFolders().subscribe((folders) => {
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
