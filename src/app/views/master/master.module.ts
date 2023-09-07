import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MasterComponent } from './master.component';
import { MasterRoutingModule } from './master.routes';
import { MenuModule } from '@app/components/menu/menu.module';
import {MatSidenavModule} from '@angular/material/sidenav';
import {SideNavComponent} from '@components/sidenav/sidenav.component';

@NgModule({
  imports: [
    CommonModule,
    MasterRoutingModule,
    MenuModule,
    MatSidenavModule
  ],
  declarations: [
    MasterComponent,
    SideNavComponent
  ]
})
export class MasterModule { }
