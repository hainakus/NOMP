import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './card/card.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SearchComponent } from './search/search.component';
import {RouterModule} from "@angular/router";



@NgModule({
    declarations: [
        CardComponent,
        SidebarComponent,
        SearchComponent
    ],
  exports: [
    CardComponent,
    SidebarComponent,
    SearchComponent
  ],
    imports: [
        CommonModule,
        RouterModule
    ]
})
export class SharedModule { }
