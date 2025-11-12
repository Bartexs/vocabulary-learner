import { Flashcard } from '../../core/models/flashcard';
import { FlashcardProficiency } from '../../core/models/flashcard-proficiency';

export interface FlashcardProgressHistoryComparison {
    flashcard: Flashcard,
    originalFlashcardProficiency: FlashcardProficiency,
    updatedFlashcardProficiency: FlashcardProficiency,
}