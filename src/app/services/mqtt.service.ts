import { Injectable } from '@angular/core';
import { Measurement } from '../contracts/measurement';
import { IMqttMessage, MqttService } from 'ngx-mqtt';
import { SystemInfo } from '../contracts/systeminfo';
import { JsonPipe } from '@angular/common';
import { DatadumpService } from './datadump.service';
import { ApppagesService } from './apppages.service';

@Injectable({
  providedIn: 'root'
})
export class MqttClientService {
  constructor(private mqttService: MqttService,
    private datadump: DatadumpService,
    private appPagesService : ApppagesService) { }

startMqttClient(){
    this.mqttService.observe("systemInfo").subscribe((message: IMqttMessage) => { 

      let infos: Measurement = (JSON.parse(message.payload.toString()));
      console.log(infos);

      if(this.appPagesService.appPages.find(p => p.title == infos.SystemInfo.Name) == undefined) {
        this.appPagesService.appPages.push({
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
        if(this.appPagesService.appPages.find(p => p.title == name)){
          let index = this.appPagesService.appPages.findIndex(p => p.title == name);
          this.appPagesService.appPages.splice(index,1);
        }
        this.datadump.data.delete(name);
    });
  }
}
