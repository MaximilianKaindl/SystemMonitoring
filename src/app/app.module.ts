import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MqttModule, IMqttServiceOptions } from 'ngx-mqtt';
import { DatadumpService } from './services/datadump.service';
import { HttpClientModule } from '@angular/common/http';
import { StatisikshttpService } from './services/statisikshttp.service';

export const MQTT_SERVICE_OPTIONS: IMqttServiceOptions = {
  hostname: '185.239.238.179',
  port: 9001,
  path: '/mqtt'
}

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    MqttModule.forRoot(MQTT_SERVICE_OPTIONS)
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    DatadumpService,
    StatisikshttpService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
