import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { StepsComponent } from './steps.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    StepsComponent,
  ],
  exports: [
    StepsComponent
  ]
})
export class StepsModule { }