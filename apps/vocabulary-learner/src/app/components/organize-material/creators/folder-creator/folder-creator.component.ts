import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FolderService } from 'apps/vocabulary-learner/src/app/core/models/folder/folder.service';

@Component({
  selector: 'app-folder-creator',
  imports: [CommonModule, FormsModule],
  templateUrl: './folder-creator.component.html',
  styleUrl: './folder-creator.component.css',
})
export class FolderCreatorComponent {
  userInput = "";

  constructor(private folderService: FolderService) {
    
  }

  onSubmit() {
    const folder = this.folderService.createFolder(this.userInput);
    this.folderService.saveFolder(folder);
  }
}
