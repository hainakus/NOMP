import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {RouterModule} from "@angular/router";
import {SharedModule} from "./shared/shared.module";
import {HttpClientModule} from "@angular/common/http";
import { NG_ENTITY_SERVICE_CONFIG } from '@datorama/akita-ng-entity-service';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
import { AkitaNgRouterStoreModule } from '@datorama/akita-ng-router-store';
import { environment } from '../environments/environment';
import { HomePageComponent } from './home-page/home-page.component';
import { MinerPageComponent } from './miner-page/miner-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    MinerPageComponent
  ],
    imports: [
        BrowserModule,
        SharedModule,
        HttpClientModule,
        RouterModule.forRoot([
          { path: '', component: HomePageComponent },
          {path: 'miner/:id', component: MinerPageComponent}
        ]),
        environment.production ? [] : AkitaNgDevtools.forRoot(),
        AkitaNgRouterStoreModule
    ],
  providers: [{ provide: NG_ENTITY_SERVICE_CONFIG, useValue: { baseUrl: 'https://jsonplaceholder.typicode.com' }}],
  bootstrap: [AppComponent]
})
export class AppModule { }
