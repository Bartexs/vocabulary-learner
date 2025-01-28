import { Injectable } from '@angular/core';
import { PracticeModeConfig } from '../models/practice-mode-config';

@Injectable({
  providedIn: 'root'
})
export class PracticeModeService {
  private practiceModeConfig!: PracticeModeConfig

  setPracticeModeConfig(newConfig: PracticeModeConfig) {
    this.practiceModeConfig = newConfig;
  }

  getPracticeModeConfig(): PracticeModeConfig {
    return this.practiceModeConfig
  }
}
