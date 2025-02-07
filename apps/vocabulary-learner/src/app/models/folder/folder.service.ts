import { Injectable } from '@angular/core';
import { Folder } from './folder';

@Injectable({
  providedIn: 'root'
})
export class FolderService {
  private folderKeyBeginning = 'folder_';

  saveFolder(folderToSave: Folder) {
    const folderKey = this.folderKeyBeginning + folderToSave.id;
    localStorage.setItem(folderKey, JSON.stringify(folderToSave));

    console.log('Folder saved to localStorage!');
  }

  loadAllFolders(): Folder[] {
    const folders: Folder[] = [];
    for(let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if(key && key.startsWith(this.folderKeyBeginning)) {
        const folderData = localStorage.getItem(key);
        if(folderData) {
          try {
            const folder: Folder = JSON.parse(folderData);
            folders.push(folder);
          } catch(error) {
            console.error(`Error parsing folder data for key: ${key}`, error);
          }
        }
      }
    }
    return folders;
  }

  getFolderById(id: number) {
    const savedFolder = localStorage.getItem(this.folderKeyBeginning + id);
    if (savedFolder) {
      console.log('Folder loaded from localStorage!');
      return JSON.parse(savedFolder);
    } else {
      console.log('No folder found in localStorage.');
    }
  }

  deleteFolder(folder: Folder) {
    localStorage.removeItem(this.folderKeyBeginning + folder.id);
  }

  createFolder(folderName: string): Folder {
    return {
      id: Date.now(),
      folderName: folderName,
      lessonList: []
    }
  }

}
