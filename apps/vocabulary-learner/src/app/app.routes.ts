import { Route } from '@angular/router';
import { HomeComponent } from './components/home.component';
import { PracticeModeComponent } from './components/practice-mode/practice-mode.component';
import { ExamModeComponent } from './components/exam-mode/exam-mode.component';
import { CreateFlashcardComponent } from './components/create-flashcard/create-flashcard.component';

export const appRoutes: Route[] = [
    { path: '', component: HomeComponent },
    { path: 'practice', component: PracticeModeComponent },
    { path: 'exam', component: ExamModeComponent },
    { path: 'new-flashcard', component: CreateFlashcardComponent }
];
