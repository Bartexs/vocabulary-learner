import { Flashcard } from '../../../../core/models/flashcard';
import { ExerciseType } from '../../../../core/models/exercise';
import { SessionType } from '../../../../core/models/session-type';

export interface LearningSessionConfig {
    learningSessionType: SessionType,
    flashcards: Flashcard[]
    exerciseList: ExerciseType[],
}