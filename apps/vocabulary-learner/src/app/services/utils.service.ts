import { Injectable } from '@angular/core';
import { Flashcard } from '../core/models/flashcard';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  getRandomFlashcards(arr: Flashcard[], count: number): Flashcard[] {
    const result: Flashcard[] = [];
    const indices: Set<number> = new Set();

    while (indices.size < count) {
        indices.add(Math.floor(Math.random() * arr.length));
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
