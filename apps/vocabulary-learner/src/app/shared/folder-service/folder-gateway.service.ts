import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from '@vocabulary-learner/core/models/apiResponse';
import { Folder } from '@vocabulary-learner/core/models/folder';
import { environment } from 'apps/vocabulary-learner/src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FolderGatewayService {

  constructor(private http: HttpClient) {}

  getFolders(): Observable<Folder[]> {
    return this.http.get<Folder[]>(`${environment.apiUrl}/api/folders/me`);
  }

  getFolderById(folderId: number): Observable<Folder> {
    return this.http.get<Folder>(`${environment.apiUrl}/api/folders/${folderId}`);
  }

  addFolder(folder: Folder): Observable<ApiResponse<Folder>> {
    return this.http.post<ApiResponse<Folder>>(`${environment.apiUrl}/api/folders/me`, { name: folder.name });
  }

  removeFolder(folder: Folder): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/api/folders/${folder.id}`);
  }

  patchFolderName(folder: Folder, newName: string): Observable<ApiResponse<Folder>> {
    return this.http.patch<ApiResponse<Folder>>(`${environment.apiUrl}/api/folders/${folder.id}`, { name: newName });
  }
}
