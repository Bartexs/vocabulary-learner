import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { Folder } from '../../models/folder';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-material-organizer',
  imports: [CommonModule, MatSidenavModule, MatIconModule],
  templateUrl: './material-organizer.component.html',
  styleUrl: './material-organizer.component.css',
})
export class MaterialOrganizerComponent implements OnInit {
  folderList: Folder[] = [];

  ngOnInit() {
    this.createDummyFolders();
  }

  createDummyFolders() {
    const list = [];

    const folderOne: Folder = {
      id: 1,
      folderName: 'German',
      lessonList: []
    }

    const folderTwo: Folder = {
      id: 2,
      folderName: 'Romanian',
      lessonList: []
    }

    const folderThree: Folder = {
      id: 3,
      folderName: 'French',
      lessonList: []
    }

    list.push(folderOne, folderTwo, folderThree)

    this.folderList = list;
  }
}
