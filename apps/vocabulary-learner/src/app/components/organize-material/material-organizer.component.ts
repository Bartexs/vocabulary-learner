import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { Folder } from '../../models/folder';
import { MatIconModule } from '@angular/material/icon';
import { CreatorService } from './creators/creator.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-material-organizer',
  imports: [CommonModule, MatSidenavModule, MatIconModule, RouterLink],
  templateUrl: './material-organizer.component.html',
  styleUrl: './material-organizer.component.css',
})
export class MaterialOrganizerComponent implements OnInit {
  folderList: Folder[] = [];

  ngOnInit() {
    this.folderList = this.creatorService.loadAllFolders();
  }

  constructor(private creatorService: CreatorService) {
    
  }

  removeFolder(index: number) {
    const folder = this.folderList[index];
    
    this.creatorService.deleteFolder(folder);
  }
}
