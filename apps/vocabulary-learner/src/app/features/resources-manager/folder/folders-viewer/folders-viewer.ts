import { Component, inject, model } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIcon } from "@angular/material/icon";
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router, RouterLink } from '@angular/router';
import { Folder } from '../../../../core/models/folder';
import { FolderService } from '../../../../shared/folder-service/folder.service';
import { MatTooltipModule } from '@angular/material/tooltip';
import { EditFolderDialogComponent } from './edit-folder-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { SnackbarService } from '../../../../shared/snackbar-service/snackbar.service';
import { DeleteFolderDialogComponent } from './delete-folder-dialog.component';

export interface EditFolderDialogData {
  folder: Folder;
}

@Component({
  selector: 'app-folders-viewer',
  imports: [CommonModule, MatIcon, MatProgressSpinnerModule, RouterLink, MatTooltipModule],
  templateUrl: './folders-viewer.component.html',
  styleUrl: './folders-viewer.component.css',
})
export class FoldersViewerComponent {
  readonly dialog = inject(MatDialog);
  readonly folderToModify = model('');
  folders: Folder[] = [];
  isLoading = true;

  constructor(
    private studyMaterialManagerService: FolderService,
    private router: Router,
    private snackbarService: SnackbarService
  ) {
    this.getUserFolders();
  }

  getUserFolders() {
    this.studyMaterialManagerService.getFolders().subscribe((folders) => {
      this.folders = folders;
      this.isLoading = false;
    });
  }
    
  removeFolder(folderId: number) {
    const folder = this.folders.find(f => f.id === folderId);

    const dialogRef = this.dialog.open(DeleteFolderDialogComponent, {
      data: {folder: folder},
    });

    dialogRef.afterClosed().subscribe((remove) => {
      if(remove && folder != undefined) {
        this.studyMaterialManagerService.removeFolder(folder).subscribe({
          next: () => {
            this.snackbarService.openSnackBar("Folder " + folder.name + " has been removed", "Ok")
            this.getUserFolders();
          },
          error: (err) => {
            console.error(err);
            console.log('Failed to delete folder', err);
          }
        })
      }
    })
  }

  goToFolderCreator() {
    this.router.navigate(['/folder-creator']);
  }

  openEditDialog(folderId: number) {
    const folder = this.folders.find(f => f.id === folderId);

    const dialogRef = this.dialog.open(EditFolderDialogComponent, {
      data: {folder: folder},
    });

    dialogRef.afterClosed().subscribe((newName) => {
      if(newName && folder != undefined) {
        this.studyMaterialManagerService.patchFolderName(folder, newName).subscribe({
          next: (f) => {
            this.snackbarService.openSnackBar("Folder " + folder.name + " name changed to " + f.data.name, "Ok")
            this.getUserFolders();
          },
          error: (err) => {
            if(err.status === 409) {
              this.snackbarService.openSnackBar("Folder " + newName + " already exist. Change name and try again.", "Ok")
            } else {
              this.snackbarService.openSnackBar("Something went wrong, please try again.", "Ok")
              console.log('Failed to create folder', err);
            }
          }
        })
      }
    })
  }
}
