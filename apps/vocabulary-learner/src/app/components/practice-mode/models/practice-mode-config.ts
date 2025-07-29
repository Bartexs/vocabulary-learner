import { ExerciseType } from "../../../core/models/exercise";
import { Lesson } from "../../../core/models/lessons";

export interface PracticeModeConfig {
    lessonList: Lesson[]
    exerciseList: ExerciseType[],
}