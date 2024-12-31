import { Injectable } from '@angular/core';
import { StudySessionConfig } from '../models/studySessionConfig';
import { PracticeConfig } from '../models/practiceConfig';
import { Lesson } from '../models/lessons';
import { LessonService } from './lesson.service';

@Injectable({
  providedIn: 'root'
})
export class StudySessionService {
  private config: StudySessionConfig | undefined;

  constructor(private lessonService: LessonService) {
    
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
