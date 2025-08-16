import { FlashcardProficiency } from "./flashcard-proficiency";

export interface Flashcard {
    id: number,
    description: string,
    front: string,
    back: string,
    lessonId: number,
    flashcardProficiency: FlashcardProficiency
}