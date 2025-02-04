import { Route } from '@angular/router';
import { HomeComponent } from './components/home.component';
import { ExamModeComponent } from './components/exam-mode/exam-mode.component';
import { FlashcardCreatorStandaloneComponent } from './components/creating-flashcards/flashcard-creator-standalone.component';
import { StudyComponent } from './components/study/study.component';
import { SessionSummaryComponent } from './components/session-summary/session-summary.component';
import { PracticeModeSelectorComponent } from './components/practice-mode/selectors/practice-mode-selector.component';
import { PracticeModeComponent } from './components/practice-mode/practice-mode.component';
import { MaterialOrganizerComponent } from './components/organize-material/material-organizer.component';
import { FolderCreatorComponent } from './components/organize-material/creators/folder-creator/folder-creator.component';
import { FolderDetailsViewerComponent } from './components/organize-material/details-viewers/folder-details-viewer/folder-details-viewer.component';

export const appRoutes: Route[] = [
    { path: '', component: HomeComponent },
    { path: 'practice-selector', component: PracticeModeSelectorComponent },
    { path: 'exam', component: ExamModeComponent },
    { path: 'create-flashcard', component: FlashcardCreatorStandaloneComponent }, 
    { path: 'browse-lessons', component: MaterialOrganizerComponent },
    { path: 'study-session', component: StudyComponent },
    { path: 'session-summary', component: SessionSummaryComponent },
    { path: 'practice', component: PracticeModeComponent },
    { path: 'folder-creator', component: FolderCreatorComponent },
    { path: 'folder-details/:id', component: FolderDetailsViewerComponent },
];
