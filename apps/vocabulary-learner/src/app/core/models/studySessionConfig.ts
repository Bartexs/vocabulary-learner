import { ExerciseType } from "./exercise";
import { Lesson } from "./lessons";

export interface StudySessionConfig {
        exerciseList: ExerciseType[],
        lessonList: Lesson[],
}