import { Injectable } from '@angular/core';
import { Folder } from '@vocabulary-learner/core/models/folder/folder';
import { FolderGatewayService } from './folder-gateway.service';
import { Observable } from 'rxjs';

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

  addFolder(folder: Folder): Observable<Folder> {
    return this.folderGateway.addFolder(folder);
  }

  removeFolder(folder: Folder): Observable<void> {
    return this.folderGateway.removeFolder(folder);
  }
}
