import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FolderService } from '../../../../shared/folder-service/folder.service';
import { SnackbarService } from '../../../../shared/snackbar-service/snackbar.service';
import {FormControl, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
  selector: 'app-folder-creator',
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './folder-creator.component.html',
  styleUrl: './folder-creator.component.css',
})
export class FolderCreatorComponent {
  userInput = "";
  folderFormControl = new FormControl('', [Validators.required]);

  constructor(
    private folderService: FolderService,
    private router: Router,
    private snackbarService: SnackbarService
  ) {
    
  }

  onSubmit() {
    if(this.folderFormControl.hasError('required') || this.folderFormControl.value === null) return; 

    const folder = this.folderService.mapToFolder(this.folderFormControl.value);

    this.folderService.addFolder(folder).subscribe({
      next: (f) => {
        this.router.navigate(['/lesson-creator', f.data.id]); 
        this.snackbarService.openSnackBar("Folder " + f.data.name + " created. Add first lesson.", "Ok")
      },
      error: (err) => {
        if(err.status === 409) {
          this.snackbarService.openSnackBar("Folder " + folder.name + " already exist. Change name and try again.", "Ok")
        } else {
          this.snackbarService.openSnackBar("Something went wrong, please try again.", "Ok")
          console.log('Failed to create folder', err);
        }
      }
    });
  }

  onCancel() {
    this.router.navigate(['/manage-learning-resources']); 
  }
}
