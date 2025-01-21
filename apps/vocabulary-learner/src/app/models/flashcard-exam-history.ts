export interface FlashcardExamHistory {
    // used for spaced repetition learning
    correctExamAnswersAmount: number,
    // if flashcard examed 5 times correct - set as mastered
    flashcardMastered: boolean,
    nextExamDate?: string,
}