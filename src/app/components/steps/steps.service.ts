import { Injectable } from '@angular/core';
import { StepsComponent } from './steps.component';

@Injectable({
  providedIn: 'root'
})
export class StepsService {
  public steps: StepsComponent.Step[];
}
