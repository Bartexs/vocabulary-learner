import { Injectable } from '@angular/core';
import { FlashcardProficiency } from '../../core/models/flashcard-proficiency';

@Injectable({
  providedIn: 'root'
})
export class SRSService {

  updateFlashcardProficiency(
    card: FlashcardProficiency,
    quality: number,
    responseTime?: number
  ): FlashcardProficiency {
    const today = new Date();

    let updatedCard: FlashcardProficiency = { ...card };

    if (!updatedCard.reviewInterval || isNaN(updatedCard.reviewInterval) || updatedCard.reviewInterval < 1) {
      updatedCard.reviewInterval = 1;
    }
    if (!updatedCard.EF || isNaN(updatedCard.EF)) {
      updatedCard.EF = 2.5;
    }

    if (quality < 3) {
      updatedCard = { ...updatedCard, repetitions: 0, reviewInterval: 1 };
    } else {
      const newRepetitions = updatedCard.repetitions + 1;

      let intervalMultiplier = updatedCard.EF;
      if (responseTime !== undefined) {
        if (responseTime < 5) intervalMultiplier *= 1.1;
        else if (responseTime > 15) intervalMultiplier *= 0.9;
      }

      const newInterval = Math.round(updatedCard.reviewInterval * intervalMultiplier);

      updatedCard = { ...updatedCard, repetitions: newRepetitions, reviewInterval: newInterval };
    }

    const newEF = Math.max(1.3, updatedCard.EF + 0.1 - (5 - quality) * 0.08);

    const nextReviewDate = new Date(today);
    nextReviewDate.setDate(today.getDate() + updatedCard.reviewInterval);

    let newKnowledgeStars = this.calculateKnowledgeStars(updatedCard.reviewInterval);

    if(updatedCard.reviewInterval === 1 && quality < 5) {
      newKnowledgeStars = 0;
    } 

    return {
      ...updatedCard,
      EF: newEF,
      lastReview: today.toISOString().split('T')[0],
      nextReview: nextReviewDate.toISOString().split('T')[0],
      knowledgeStars: newKnowledgeStars
    };
  }

  calculateKnowledgeStars(intervalDays: number): number {
      if (intervalDays >= 365) return 5;
      if (intervalDays >= 180) return 4;
      if (intervalDays >= 30) return 3;
      if (intervalDays >= 7) return 2;
      if (intervalDays >= 1) return 1
      return 0;
  }
}
