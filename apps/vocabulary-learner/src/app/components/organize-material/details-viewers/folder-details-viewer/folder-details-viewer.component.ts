import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { FolderService } from '../../../../models/folder/folder.service';
import { Folder } from '../../../../models/folder/folder';

@Component({
  selector: 'app-folder-details-viewer',
  imports: [CommonModule, MatIconModule],
  templateUrl: './folder-details-viewer.component.html',
  styleUrl: './folder-details-viewer.component.css',
})
export class FolderDetailsViewerComponent implements OnInit {
  folder!: Folder;
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private folderService: FolderService,
  ) {
    
  }
  
  ngOnInit(): void {
    this.retrieveIdFromURL();
  }

  retrieveIdFromURL() {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      this.folder = this.folderService.getFolderById(id)
      this.isLoading = false;
    });
  }
}
