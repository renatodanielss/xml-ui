import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { DragDropComponent } from './drag-drop.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { AngularSvgIconModule } from 'angular-svg-icon';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    DragDropModule,
    AngularSvgIconModule.forRoot(),
  ],
  declarations: [
    DragDropComponent
  ],
  exports: [
    DragDropComponent
  ]
})
export class DragDropComponentModule { }
