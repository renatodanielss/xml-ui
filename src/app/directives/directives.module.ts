import { NgModule } from '@angular/core';
import { NgInitDirective } from './ng-init.directive';
import { OnlyNumbersDirective } from './only-numbers.directive';
import { OnlyStringDirective } from './only-string.directive';
import { WhellDirective } from './whell.directive';

@NgModule({
  declarations: [
    OnlyNumbersDirective,
    OnlyStringDirective,
    WhellDirective,
    NgInitDirective
  ],
  imports: [],
  exports: [
    OnlyNumbersDirective,
    OnlyStringDirective,
    WhellDirective,
    NgInitDirective
  ]
})
export class DirectivesModule { }
