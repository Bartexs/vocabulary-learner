export interface FlashcardExamHistory {
    // used for spaced repetition learning
    correctExamAnswersDates: Date[],
    correctExamAnswersAmount: number,
    // if flashcard examed 5 times correct - set as mastered
    flashcardMastered: boolean,
}