import { Route } from '@angular/router';
import { HomeComponent } from './components/home.component';
import { ExamModeComponent } from './components/exam-mode/exam-mode.component';
import { SessionSummaryComponent } from './components/session-summary/session-summary.component';
import { PracticeModeSelectorComponent } from './components/practice-mode/selectors/practice-mode-selector.component';
import { PracticeModeComponent } from './components/practice-mode/practice-mode.component';
import { MaterialOrganizerComponent } from './components/organize-material/material-organizer.component';
import { FolderCreatorComponent } from './components/organize-material/creators/folder-creator/folder-creator.component';
import { FolderDetailsViewerComponent } from './components/organize-material/details-viewers/folder-details-viewer/folder-details-viewer.component';
import { LessonCreatorComponent } from './components/organize-material/creators/lesson-creator/lesson-creator.component';
import { LessonDetailsViewerComponent } from './components/organize-material/details-viewers/lesson-details-viewer/lesson-details-viewer.component';
import { FlashcardCreatorStandaloneComponent } from './components/organize-material/creators/flashcard-creator/standalone/flashcard-creator-standalone.component';

export const appRoutes: Route[] = [
    { path: '', component: HomeComponent },
    { path: 'practice-selector', component: PracticeModeSelectorComponent },
    { path: 'exam', component: ExamModeComponent },
    { path: 'browse-lessons', component: MaterialOrganizerComponent },
    { path: 'session-summary', component: SessionSummaryComponent },
    { path: 'practice', component: PracticeModeComponent },
    { path: 'folder-creator', component: FolderCreatorComponent },
    { path: 'folder-details/:id', component: FolderDetailsViewerComponent },
    { path: 'lesson-creator/:id', component: LessonCreatorComponent },
    { path: 'lesson-creator', component: LessonCreatorComponent },
    { path: 'lesson-details/:id', component: LessonDetailsViewerComponent },
    { path: 'flashcard-creator', component: FlashcardCreatorStandaloneComponent },
];
