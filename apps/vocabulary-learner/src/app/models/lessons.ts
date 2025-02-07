import { Flashcard } from "./flashcard";

export interface Lesson {
    id: number,
    folderId: number,
    name: string,
    flashcards: Flashcard[]
}