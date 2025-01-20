import { FlashcardExamHistory } from "./flashcard-exam-history";

export interface Flashcard {
    id: number,
    lessonId: number,
    frontSide: string,
    backSide: string,
    flashcardExamHistory: FlashcardExamHistory
}