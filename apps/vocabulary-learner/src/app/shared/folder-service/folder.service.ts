import { Injectable } from '@angular/core';
import { Folder } from '../../core/models/folder';
import { FolderGatewayService } from './folder-gateway.service';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../core/models/apiResponse';

@Injectable({
  providedIn: 'root'
})
export class FolderService {

  constructor(
    private folderGateway: FolderGatewayService
  ) {
    
  }

  getFolders(): Observable<Folder[]> {
    return this.folderGateway.getFolders();
  }

  getFolderById(folderId: number): Observable<Folder> {
    return this.folderGateway.getFolderById(folderId);
  }

  addFolder(folder: Folder): Observable<ApiResponse<Folder>> {
    return this.folderGateway.addFolder(folder);
  }

  removeFolder(folder: Folder): Observable<void> {
    return this.folderGateway.removeFolder(folder);
  }

  mapToFolder(folderName: string): Folder {
    return {
      id: Date.now(),
      name: folderName,
      lessonList: []
    }
  }

  patchFolderName(folder: Folder, newName: string): Observable<ApiResponse<Folder>> {
    return this.folderGateway.patchFolderName(folder, newName);
  }
}
