export interface FlashcardProficiency {
    // after level 5 of masteryLevel set flashcard as mastered - don't show it in repetition material, 
    flashcardMastered: boolean,
    // used for space repetition levels 0 - 5, 
    masteryLevel: number, 
    // date to verify if user still remember particular flashcard
    nextExamDate?: string,
}