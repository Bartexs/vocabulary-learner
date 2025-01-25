import { Route } from '@angular/router';
import { HomeComponent } from './components/home.component';
import { ExamModeComponent } from './components/exam-mode/exam-mode.component';
import { BrowseLessonsComponent } from './components/browse-lessons/browse-lessons.component';
import { FlashcardCreatorStandaloneComponent } from './components/creating-flashcards/flashcard-creator-standalone.component';
import { StudyComponent } from './components/study/study.component';
import { SessionSummaryComponent } from './components/session-summary/session-summary.component';
import { PracticeModeSelectorComponent } from './components/practice-mode/selectors/practice-mode-selector.component';
import { PracticeModeComponent } from './components/practice-mode/practice-mode.component';

export const appRoutes: Route[] = [
    { path: '', component: HomeComponent },
    { path: 'practice', component: PracticeModeSelectorComponent },
    { path: 'exam', component: ExamModeComponent },
    { path: 'create-flashcard', component: FlashcardCreatorStandaloneComponent }, 
    { path: 'browse-lessons', component: BrowseLessonsComponent },
    { path: 'study-session', component: StudyComponent },
    { path: 'session-summary', component: SessionSummaryComponent },
    { path: 'test', component: PracticeModeComponent }
];
