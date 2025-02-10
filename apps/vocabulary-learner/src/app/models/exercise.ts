export const Exercise = {
    Writing: { name: 'Writing', componentName: 'WritingExercise' },
    Browse: { name: 'Browse', componentName: 'BrowsingExercise' },
    FillBlankSpots: { name: 'FillBlankSpots', componentName: 'FillBlankSpaceExercise' },
    ConnectFlashcardSides: { name: 'ConnectFlashcardSides', componentName: 'ConnectFlashcardSidesExercise' },
    AnswerChosingTimed: { name: 'AnswerChosingTimed', componentName: 'AnswerChosingTimedExercise'}
} as const; 

export type ExerciseType = typeof Exercise[keyof typeof Exercise];

export function getExercises(): ExerciseType[] {
    return Object.values(Exercise);
}

export function getExercisesByNames(exerciseNames: string[]): ExerciseType[] {
    return Object.values(Exercise).filter(exercise => exerciseNames.includes(exercise.name));
}