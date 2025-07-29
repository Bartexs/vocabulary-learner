import { Injectable } from '@angular/core';
import { StudySessionConfig } from '../core/models/studySessionConfig';
import { PracticeConfig } from '../core/models/practiceConfig';
import { Lesson } from '../core/models/lessons';
import { LessonService } from './lesson.service';
import { StudySessionResults } from '../core/models/studySessionResults';

@Injectable({
  providedIn: 'root'
})
export class StudySessionService {
  private config: StudySessionConfig | undefined;
  private results!: StudySessionResults;

  constructor(private lessonService: LessonService) {
    
  }

  setResults(results: StudySessionResults): void {
    this.results = results;
  }

  getResults(): StudySessionResults {
    return this.results;
  }

  getConfig(): StudySessionConfig {
    if (!this.config) {
      throw new Error('Study session configuration is missing.');
    }
    return this.config;
  }

  setStudySessionConfigByUsingPracticeConfig(practiceConfig: PracticeConfig) {
    const lessonListConverted: Lesson[] = this.lessonService.getLessonsByID(practiceConfig.lessonsID);

    const convertedConfig: StudySessionConfig = {
      exerciseList: practiceConfig.exerciseList, 
      lessonList: lessonListConverted
    }
    this.config = convertedConfig; 
  }
}
