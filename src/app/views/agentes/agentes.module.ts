import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {TranslateModule} from '@ngx-translate/core';
import {AgentesComponent} from './agentes.component';
import {BreadcrumbsModule} from '@app/components/breadcrumbs/breadcrumbs.module';
import {MatTabsModule} from '@angular/material/tabs';
import {MatIconModule} from '@angular/material/icon';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {ColorPickerModule} from 'ngx-color-picker';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatNativeDateModule} from '@angular/material/core';
import {MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {LoadingModule} from '@app/components/loading/loading.module';
import {ModalModule} from '@app/components/modal/modal.module';
import {AngularSvgIconModule} from 'angular-svg-icon';
import {DragDropComponentModule} from './drag-drop/drag-drop.module';
import {NgxMaskModule} from 'ngx-mask';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {SlickCarouselModule} from 'ngx-slick-carousel';

export const MY_FORMATS = {
  parse: {
    dateInput: 'YYYY',
  },
  display: {
    dateInput: 'YYYY',
    monthYearLabel: 'MMM',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    BreadcrumbsModule,
    MatTabsModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatAutocompleteModule,
    ModalModule,
    ColorPickerModule,
    LoadingModule,
    DragDropComponentModule,
    SlickCarouselModule,
    NgxMaskModule.forRoot(),
    AngularSvgIconModule.forRoot(),
    RouterModule.forChild([
      { path: '', component: AgentesComponent }
    ])
  ],
  declarations: [
    AgentesComponent
  ],
  providers: [
    MatDatepickerModule,
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    {
      provide: MAT_DATE_FORMATS,
      useValue: MY_FORMATS
    }
  ]
})
export class AgentesModule { }
