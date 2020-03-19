import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { MqttService, IMqttMessage } from 'ngx-mqtt';
import { SystemInfo } from './contracts/systeminfo';
import { JsonPipe } from '@angular/common';
import { DatadumpService } from './services/datadump.service';
import { Measurement } from './contracts/measurement';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  public appPages = [];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private mqttService: MqttService,
    private datadump: DatadumpService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {
    const path = window.location.pathname.split('folder/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }

    this.mqttService.observe("systemInfo").subscribe((message: IMqttMessage) => { 

      let infos: Measurement = JSON.parse(message.payload.toString());

      if(this.appPages.find(p => p.title == infos.systemInfo.Id) == undefined) {
        this.appPages.push({
          title: infos.systemInfo.Id,
          url: '/folder/' + infos.systemInfo.Id,
          icon: 'desktop' 
        });
      }

      let measurement = this.datadump.data.get(infos.systemInfo.Id);

      if(measurement == undefined)
        this.datadump.data.set(infos.systemInfo.Id,measurement);
      else {
        measurement.systemInfo.Cpu = { ...infos.systemInfo.Cpu }
        measurement.systemInfo.Ram = { ...infos.systemInfo.Ram }
      }
    });
  }
}
