import { Lesson } from "./lessons";


export interface Folder {
    id: number;
    name: string;
    lessonList: Lesson[];
}