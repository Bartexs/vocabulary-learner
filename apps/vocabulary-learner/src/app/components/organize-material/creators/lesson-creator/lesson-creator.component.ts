import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Folder } from '../../../../models/folder/folder';
import { FolderService } from '../../../../models/folder/folder.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-lesson-creator',
  imports: [CommonModule],
  templateUrl: './lesson-creator.component.html',
  styleUrl: './lesson-creator.component.css',
})
export class LessonCreatorComponent implements OnInit {
  folder: Folder | undefined;
  folderList: Folder[] | undefined;

  constructor(
    private folderService: FolderService,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit() {
    this.retrieveIdFromURL();
  }

  retrieveIdFromURL() {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      this.folder = this.folderService.getFolderById(id)

      if(!this.folder) {
        this.folderList = this.folderService.loadAllFolders();
      }
    });
  }
}
