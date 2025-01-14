import { Lesson } from "./lessons";

export interface MaterialFolder {
    id: number,
    name: string,
    lessonList: Lesson[]
}