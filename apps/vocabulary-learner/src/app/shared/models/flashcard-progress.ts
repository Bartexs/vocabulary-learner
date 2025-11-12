import { FlashcardProficiency } from '../../core/models/flashcard-proficiency';
import { Flashcard } from '../../core/models/flashcard';

export interface FlashcardProgress {
    flashcard: Flashcard,
    proficiency: FlashcardProficiency
}