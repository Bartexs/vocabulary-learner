import { ExerciseType } from "@vocabulary-learner/core/models/exercise";

export interface ExercisesData {
    exerciseIndex: number;
    exercisesTotal: number;
    currentExercise: ExerciseType;
}

