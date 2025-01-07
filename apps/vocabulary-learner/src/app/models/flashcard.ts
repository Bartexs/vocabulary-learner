import { FlashcardExamHistory } from "./flashcard-exam-history";

export interface Flashcard {
    id: number,
    frontSide: string,
    backSide: string,
    flashcardExamHistory: FlashcardExamHistory
}