import { Injectable } from '@angular/core';
import { Flashcard } from '../models/flashcard';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  getRandomFlashcards(arr: Flashcard[], count: number, indices: Set<number>): Flashcard[] {
    const result: Flashcard[] = [];
    
    // Correct answer is already added 
    while (indices.size < count || indices.size === 1) {
      let obj = Math.floor(Math.random() * arr.length);

      // Make sure duplicates won't show up if arr greater than 5 flashcards
      if(arr.length > 5) {
          while(indices.has(obj)) {
          obj = Math.floor(Math.random() * arr.length)
        }
      }

      indices.add(obj);
    }

    for (const index of indices) {
        result.push(arr[index]);
    }

    return result;
  }

  shuffleArray<T>(array: T[]): T[] {
    return [...array].sort(() => Math.random() - 0.5);
  }
}
