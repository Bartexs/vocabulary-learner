import { ExerciseType } from "../../../models/exercise";
import { Lesson } from "../../../models/lessons";

export interface PracticeModeConfig {
    exerciseList: ExerciseType[],
    lessonList: Lesson[]
}