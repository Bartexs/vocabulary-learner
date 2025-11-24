import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from '@vocabulary-learner/core/models/apiResponse';
import { environment } from 'apps/vocabulary-learner/src/environments/environment';
import { Observable } from 'rxjs';
import { StatisticsDTO } from '../dtos/statisticsDTO';

@Injectable({
  providedIn: 'root'
})
export class StatisticsGatewayService {
  private baseUrl = `${environment.apiUrl}/api`;

  constructor(
    private http: HttpClient
  ) { 

  }

  getTotalFlashcards(): Observable<ApiResponse<StatisticsDTO>> {
    return this.http.get<ApiResponse<StatisticsDTO>>(`${this.baseUrl}/stats/flashcards`);
  }

}
