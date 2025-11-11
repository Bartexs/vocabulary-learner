import { Flashcard } from '../../../../core/models/flashcard';
import { ExerciseType } from '../../../../core/models/exercise';
import { SessionType } from '../../../../core/models/session-type';

// change name to LearningSessionConfig
export interface PracticeModeConfig {
    learningSessionType: SessionType,
    flashcards: Flashcard[]
    exerciseList: ExerciseType[],
}