import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './card/card.component';
import { SidebarComponent } from './sidebar/sidebar.component';



@NgModule({
    declarations: [
        CardComponent,
        SidebarComponent
    ],
    exports: [
        CardComponent,
        SidebarComponent
    ],
    imports: [
        CommonModule
    ]
})
export class SharedModule { }
