import { ExerciseType } from "./exercise";

export interface StudySessionResults {
    exercise: ExerciseType,
    correctAnswers: number,
    wrongAnswers: number,
    totalFlashcards: number,
}