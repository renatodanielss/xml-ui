import {Component, Input, ElementRef, Output, EventEmitter, OnDestroy, HostListener, ViewChild, Renderer2} from '@angular/core';
import {animate, AnimationBuilder, AnimationPlayer, style} from '@angular/animations';
import {MatSidenav} from '@angular/material/sidenav';

@Component({
  selector: 'sidenav',
  templateUrl: 'sidenav.component.html',
  styleUrls: ['sidenav.component.scss']
})

export class SideNavComponent {
  events: string[] = [];
  opened: boolean;
  openedSideNav = false;
  private sidenav: MatSidenav;
  @Input() public contentClass: string;
  @Input() public overflow: string;

  public toogle(): void {
    if (this.openedSideNav === false) {
      this.openedSideNav = true;
    } else {
      this.openedSideNav = false;
    }
  }
}
