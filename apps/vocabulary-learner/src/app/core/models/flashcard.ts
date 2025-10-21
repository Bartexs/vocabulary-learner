export interface Flashcard {
    id: number,
    description: string,
    front: string,
    back: string,
    lessonId: number,
    flashcardProficiencyId?: number
}