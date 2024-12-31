import { Route } from '@angular/router';
import { HomeComponent } from './components/home.component';
import { PracticeModeComponent } from './components/practice-mode/practice-mode.component';
import { ExamModeComponent } from './components/exam-mode/exam-mode.component';
import { BrowseLessonsComponent } from './components/browse-lessons/browse-lessons.component';
import { FlashcardCreatorStandaloneComponent } from './components/creating-flashcards/flashcard-creator-standalone.component';
import { StudyComponent } from './components/study/study.component';

export const appRoutes: Route[] = [
    { path: '', component: HomeComponent },
    { path: 'practice', component: PracticeModeComponent },
    { path: 'exam', component: ExamModeComponent },
    { path: 'create-flashcard', component: FlashcardCreatorStandaloneComponent }, 
    { path: 'browse-lessons', component: BrowseLessonsComponent },
    { path: 'study-session', component: StudyComponent }
];
