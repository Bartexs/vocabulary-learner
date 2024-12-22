import { Flashcard } from "./flashcard";

export interface Lesson {
    id: number,
    name: string,
    flashcards: Flashcard[]
}