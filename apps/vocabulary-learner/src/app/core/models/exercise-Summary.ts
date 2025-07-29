import { ExerciseType } from "./exercise";
import { Flashcard } from "./flashcard";

export interface ExerciseSummary {
    id: number, 
    exercise: ExerciseType,
    correctAnswers: number,
    wrongAnswers: number,
    totalFlashcards: number,
    correctFlashcards: Flashcard[],
    wrongFlashcards: Flashcard[],
}