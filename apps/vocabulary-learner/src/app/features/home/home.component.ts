import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from "@angular/router";
import { FolderService } from '@vocabulary-learner/shared/folder-service/folder.service';
import { Folder } from '@vocabulary-learner/core/models/folder';
import { MatDialog } from '@angular/material/dialog';
import { FoldersDialogComponent } from './folders-dialog.component';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})

export class HomeComponent implements OnInit {
  folders: Folder[] = [];
  noFoldersExist = true;
  readonly dialog = inject(MatDialog);

  constructor(
    private folderService: FolderService,
  ) {
    
  }

  ngOnInit(): void {
    this.getUserFolders();
  }

  getUserFolders() {
    this.folderService.getFolders().subscribe({
      next: (f) => {
        this.folders = f;
      },
      error: (err) => {
        console.error(err);
        console.log('Failed to load folders', err);
      }
    });
  }

  openFoldersSelectorDialog() {
    console.log(this.folders);
    this.dialog.open(FoldersDialogComponent, {
      data: {folders: this.folders},
    });
  }
}
