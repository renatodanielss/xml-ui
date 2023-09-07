import { ModalModule } from "../modal/modal.module";
import { AlertComponent } from "./alert.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AlertService } from "./alert.service";
import { TranslateModule } from "@ngx-translate/core";
import { MatIconModule } from "@angular/material/icon";

@NgModule({
    imports: [
        CommonModule,
        ModalModule,
        TranslateModule,
        MatIconModule
    ],
    declarations: [
        AlertComponent,
    ],
    entryComponents: [
        AlertComponent
    ],
    providers: [
        AlertService
    ]
})
export class AlertModule {
}