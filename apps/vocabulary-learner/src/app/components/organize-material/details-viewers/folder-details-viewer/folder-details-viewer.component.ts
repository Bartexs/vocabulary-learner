import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Folder } from 'apps/vocabulary-learner/src/app/models/folder';
import { CreatorService } from '../../creators/creator.service';

@Component({
  selector: 'app-folder-details-viewer',
  imports: [CommonModule],
  templateUrl: './folder-details-viewer.component.html',
  styleUrl: './folder-details-viewer.component.css',
})
export class FolderDetailsViewerComponent implements OnInit {
  folder!: Folder;
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private creatorService: CreatorService,
  ) {
    
  }
  
  ngOnInit(): void {
    this.retrieveIdFromURL();
  }

  retrieveIdFromURL() {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      this.folder = this.creatorService.getFolderById(id)
      this.isLoading = false;
    });
  }
}
