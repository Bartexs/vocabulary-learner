import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Folder } from '../../../../models/folder/folder';
import { FolderService } from 'apps/vocabulary-learner/src/app/models/folder/folder.service';

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
    const newFolder: Folder = {
      id: Date.now(),
      folderName: this.userInput,
      lessonList: []
    }

    this.folderService.saveFolder(newFolder);
  }
}
