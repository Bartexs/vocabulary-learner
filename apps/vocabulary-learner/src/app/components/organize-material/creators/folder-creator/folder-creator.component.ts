import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FolderService } from '../../../../shared/folder-service/folder.service';

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
  ) {
    
  }

  onSubmit() {
    const folder = this.folderService.mapToFolder(this.userInput);

    this.folderService.addFolder(folder).subscribe({
      next: (folder) => {
        console.log("Folder " + folder.name + " created!")
      },
      error: (err) => {
        console.log('Failed to create folder', err);
      }
    });
  }
}
