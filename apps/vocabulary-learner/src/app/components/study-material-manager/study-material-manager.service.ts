import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'apps/vocabulary-learner/src/environments/environment';
import { Folder } from '../../models/folder/folder';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudyMaterialManagerService {

  constructor(private http: HttpClient, private router: Router) {}

  getUserFolders(): Observable<Folder[]> {
    return this.http.get<Folder[]>(`${environment.apiUrl}/api/folders/me`);
  }

  addUserFolder(folder: Folder): Observable<Folder> {
    console.log(folder);

    return this.http.post<Folder>(`${environment.apiUrl}/api/folders/me`, { name: folder.name });
  }
}
