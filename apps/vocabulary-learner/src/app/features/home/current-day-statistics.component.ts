import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatisticsService } from '../../shared/services/statistics/statistics.service';
import { MatProgressSpinner } from "@angular/material/progress-spinner";
import { StudySessionLogDTO } from '../../shared/dtos/studySessionLogDTO';

@Component({
  selector: 'app-current-day-statistics',
  imports: [CommonModule, MatProgressSpinner],
  templateUrl: './current-day-statistics.component.html',
  styleUrl: './current-day-statistics.component.css',
})
export class CurrentDayStatisticsComponent implements OnInit {
  stats!: StudySessionLogDTO;
  isLoading = true;

  constructor(
    private statisticsService: StatisticsService,
  ) {
    
  }

  ngOnInit() {
    this.getStatistics();
  }

  getStatistics() {
    this.statisticsService.getCurrentDaySummary().subscribe({
      next: (data) => {
        this.stats = data
        this.isLoading = false;
      }
    })
  }
}
