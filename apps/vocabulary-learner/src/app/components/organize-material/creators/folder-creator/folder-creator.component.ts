import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Folder } from '../../../../models/folder';
import { CreatorService } from '../creator.service';

@Component({
  selector: 'app-folder-creator',
  imports: [CommonModule, FormsModule],
  templateUrl: './folder-creator.component.html',
  styleUrl: './folder-creator.component.css',
})
export class FolderCreatorComponent {
  userInput = "";

  constructor(private creatorService: CreatorService) {
    
  }

  onSubmit() {
    const newFolder: Folder = {
      id: Date.now(),
      folderName: this.userInput,
      lessonList: []
    }

    this.creatorService.saveFolder(newFolder);
  }
}
