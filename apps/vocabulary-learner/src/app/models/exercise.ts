export const Exercise = {
    Writing: { name: 'Writing', componentName: 'WritingExercise' },
    Browse: { name: 'Browse', componentName: 'BrowsingExercise' },
    FillBlankSpots: { name: 'FillBlankSpots', componentName: 'FillBlankSpaceExercise' },
} as const;

export type ExerciseType = typeof Exercise[keyof typeof Exercise];

export function getExercises(): ExerciseType[] {
    return Object.values(Exercise);
}