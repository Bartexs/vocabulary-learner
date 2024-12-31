import { Exercise } from "./exercise";
import { Lesson } from "./lessons";

export interface StudySessionConfig {
        exerciseList: Exercise[],
        lessonList: Lesson[],
}