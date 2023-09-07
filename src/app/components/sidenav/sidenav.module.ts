import {NgModule} from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatNativeDateModule} from '@angular/material/core';
import {HttpClientModule} from '@angular/common/http';
import {SideNavComponent} from '@components/sidenav/sidenav.component';
import {TranslateModule} from '@ngx-translate/core';
import {CommonModule} from '@angular/common';

@NgModule({
  imports: [
    FormsModule,
    HttpClientModule,
    MatNativeDateModule,
    MatSidenavModule,
    ReactiveFormsModule,
    TranslateModule,
    CommonModule,
  ],
  exports: [
    SideNavComponent
  ],
  declarations: [
    SideNavComponent
  ],
  providers: [],
  bootstrap: [SideNavComponent],
})
export class SideNavModule {}
