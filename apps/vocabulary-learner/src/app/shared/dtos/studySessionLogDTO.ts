export interface StudySessionLogDTO {
    id: number,
    correctCountSRS: number,
    incorrectCountSRS: number,
    reviewedFlashcardsInSRS: number,
    newFlashcardsExaminedInSRS: number,
    createdFlashcards: number,
    practicedFlashcards: number
}