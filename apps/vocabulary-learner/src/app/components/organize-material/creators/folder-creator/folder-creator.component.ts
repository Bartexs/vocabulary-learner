import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FolderService } from '../../../../shared/folder-service/folder.service';
import { Router } from '@angular/router';
import { SnackbarService } from '../../../../shared/snackbar-service/snackbar.service';

@Component({
  selector: 'app-folder-creator',
  imports: [CommonModule, FormsModule],
  templateUrl: './folder-creator.component.html',
  styleUrl: './folder-creator.component.css',
})
export class FolderCreatorComponent {
  userInput = "";

  constructor(
    private folderService: FolderService,
    private router: Router,
    private snackbarService: SnackbarService
  ) {
    
  }

  onSubmit() {
    const folder = this.folderService.mapToFolder(this.userInput);

    this.folderService.addFolder(folder).subscribe({
      next: (folder) => {
        console.log("Folder " + folder.name + " created!")
        this.router.navigate(['/lesson-creator', folder.id]); 
        this.snackbarService.openSnackBar("Folder " + folder.name + " created. Add first lesson.", "Ok")
      },
      error: (err) => {
        console.log('Failed to create folder', err);
      }
    });
  }
}
