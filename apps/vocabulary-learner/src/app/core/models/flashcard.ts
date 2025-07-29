import { FlashcardProficiency } from "./flashcard-proficiency";

export interface Flashcard {
    id: number,
    lessonId: number,
    frontSide: string,
    backSide: string,
    flashcardProficiency: FlashcardProficiency
}