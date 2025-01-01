import { Exercise } from "./exercise";

export interface StudySessionResults {
    exercise: Exercise,
    correctAnswers: number,
    wrongAnswers: number,
    totalFlashcards: number,
}