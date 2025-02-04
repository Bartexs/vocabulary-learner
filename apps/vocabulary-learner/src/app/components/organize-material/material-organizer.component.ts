import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { Folder } from '../../models/folder/folder';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { FolderService } from '../../models/folder/folder.service';

@Component({
  selector: 'app-material-organizer',
  imports: [CommonModule, MatSidenavModule, MatIconModule, RouterLink],
  templateUrl: './material-organizer.component.html',
  styleUrl: './material-organizer.component.css',
})
export class MaterialOrganizerComponent implements OnInit {
  folderList: Folder[] = [];

  ngOnInit() {
    this.folderList = this.folderService.loadAllFolders();
  }

  constructor(private folderService: FolderService) {
    
  }

  removeFolder(index: number) {
    const folder = this.folderList[index];
    
    this.folderService.deleteFolder(folder);
  }
}
