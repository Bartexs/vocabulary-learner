import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudyMaterialManagerService } from './study-material-manager.service';
import { Folder } from '../../models/folder/folder';

@Component({
  selector: 'app-study-material-manager',
  imports: [CommonModule],
  templateUrl: './study-material-manager.component.html',
  styleUrl: './study-material-manager.component.css',
})
export class StudyMaterialManagerComponent {
  userFolders: Folder[] | undefined;
  isLoading = true;

  constructor(private studyMaterialManagerService: StudyMaterialManagerService) {
    this.addUserFolder();
    this.getUserFolders();
  }

  getUserFolders() {
    this.studyMaterialManagerService.getUserFolders().subscribe((folders) => {
      this.userFolders = folders;
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


}
