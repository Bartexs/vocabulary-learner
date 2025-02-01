import { Lesson } from "./lessons";

export interface Folder {
    id: number, 
    folderName: string,
    lessonList: Lesson[];
}