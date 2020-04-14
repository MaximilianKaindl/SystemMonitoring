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

      let infos: Measurement = (JSON.parse(message.payload.toString()));

      if(this.appPages.find(p => p.title == infos.SystemInfo.Name) == undefined) {
        this.appPages.push({
          title: infos.SystemInfo.Name,
          url: '/folder/' + infos.SystemInfo.Name,
          icon: 'desktop' 
        });
      }

      let measurement = this.datadump.data.get(infos.SystemInfo.Name);

      if(measurement == undefined)
        this.datadump.data.set(infos.SystemInfo.Name,infos);
      else {
        measurement.Timestamp = infos.Timestamp
        measurement.SystemInfo = { ...infos.SystemInfo }
      }
    });
    this.mqttService.observe("connectionClosed").subscribe((message:IMqttMessage) => {
        let name : string = (JSON.parse(message.payload.toString())).Name;
        if(this.appPages.find(p => p.title == name)){
          let index = this.appPages.findIndex(p => p.title == name);
          this.appPages.splice(index,1);
        }
        this.datadump.data.delete(name);
    });
  }
}
