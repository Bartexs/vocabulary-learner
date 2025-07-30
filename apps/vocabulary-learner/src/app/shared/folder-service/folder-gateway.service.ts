import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Folder } from '@vocabulary-learner/core/models/folder/folder';
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

  addFolder(folder: Folder): Observable<Folder> {
    return this.http.post<Folder>(`${environment.apiUrl}/api/folders/me`, { name: folder.name });
  }

  removeFolder(folder: Folder): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/api/folders/${folder.id}`);
  }
}
