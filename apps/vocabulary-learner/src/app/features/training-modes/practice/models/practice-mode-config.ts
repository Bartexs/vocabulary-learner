import { Flashcard } from '../../../../core/models/flashcard';
import { ExerciseType } from '../../../../core/models/exercise';

// change name to LearningSessionConfig
export interface PracticeModeConfig {
    learningSessionType: string,
    flashcards: Flashcard[]
    exerciseList: ExerciseType[],
}