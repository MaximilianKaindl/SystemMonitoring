import { Injectable, OnInit } from '@angular/core';
import { DatadumpService } from './datadump.service';
import { MqttService as mqtt, IMqttMessage } from 'ngx-mqtt';
import { Measurement } from '../contracts/measurement';

@Injectable({
  providedIn: 'root'
})
export class MqttService{

  constructor(private mqttService: mqtt, private datadump: DatadumpService) {
  }

  observe(){
    this.mqttService.observe("systemInfo").subscribe((message: IMqttMessage) => { 
      let infos: Measurement = (JSON.parse(message.payload.toString()));
      this.datadump.pushFolder(infos);

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
        this.datadump.deleteFolder(name);
        this.datadump.data.delete(name);
    });
    this.mqttService.observe("raspberryInfo").subscribe((message:IMqttMessage) => {
      console.log(message)
    });
  }

}
