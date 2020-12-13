import { Injectable, OnInit } from '@angular/core';
import { Measurement } from '../contracts/measurement';
import { DatadumpService } from './datadump.service';
// Imports the Google Cloud client library
const {PubSub} = require('@google-cloud/pubsub');

const admin = require('firebase-admin');
let messageCount = 0;
const messageHandler = message => {
  console.log(`Received message ${message.id}:`);
  console.log(`\tData: ${message.data}`);
  console.log(`\tAttributes: ${message.attributes}`);
  messageCount += 1;
  message.ack();
};

const serviceAccount = {
  type: "service_account",
  project_id: "systemmonitoring-294918",
  private_key_id: "b4f8146cefa93e05b6c66330faf2523fa6a6b06d",
  private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQC/8sYQCchMeoVK\nYdBJlXjWjbwynRK+IwN/ltuHTial2lcmrpGrcpOSfkAOH7lJh1DSaQpv0e8tHty7\nm/rmSzyDXib376QMDS4/ICU73o256bdYVThc4BQfBoMG1aLuUuyWM6Y+GHBlK9T8\ndyqg+KVbCLxQH2Ls0ssKr84f4klTCIWsEt6dT1p8tpXSqt+Z5SYlUF/Cyq3h/qb2\n//wlxt0pHJQ0eDqxMlcxyFV52hkoNJ+AMRnaVe5lDZu9DXMKSQTUDD+GyddE6rxs\n6zS7BF6+iwPuHDzo8yO6qNOb4QHdPmQzKvq1nilQJKVBvmBLh02hYjNuvyzzi46C\nt99HDildAgMBAAECggEAGAMgaOg4YOzg2M3EtzfWLoz7kp9YtWV+7gqqutH5fr0C\nMwoamgaS1HwrujiYvsyJPVE7p4JtN8lJFsUsDXwy/UIdgN2/OWy6sNXuIn+0XiIR\nOCEtFF1J1xnC8WtvXv4Lr7yVWuZGxTlHAzBLKmkAkpNUr3dFsleqY9NbZ1yxDIxo\nWh61Pvomg4s6uY1AcS0sJFWWgM+8Cdcd/fAnRI/jaTQcf24r29KJp2LXPLJV7HRi\nzuR9kwqw4fM2fxnYxeZdcgnkpaANWLRQZ9AYjXRvgSo0mMOSE+GX3l9yX8GKIRKk\n1qpMwWmGAfV6frZypTeXierpkmIiaSTgVIIeSm12UQKBgQDoePXbJmetNjo/oubL\nHkIdRuKD6T8bMwCyaayLOO854e1tBXF+Ub+RI/i8DG7Oj0B+pXMCVRNNAUEtYqhJ\n4Vz81PxvBvVFSh7EXr4x+que7ekrZrmSeX0aK5ObstgfJC3xO6HCEAbuINmbji0K\n+JYGOFxep27xcw0nhjyo2nNfFQKBgQDTX+NwO1SbOJk2LAUHVuGVnckmmypXomNF\nUHqjUOIRYBXqsvqUh5dyy1UlULSKwZllLqKpW2ED0q0lIsG3XhAh5pIUjdwgq8K9\nDSU1aaZ0WygHLidzuvVVs+M4F2Ap6bRiYG7OpW0IZcAWS3rvAme9TP/qEJ+xAmW4\nNOgp5sfzKQKBgE12sQX7gCSZo0M9NwaL6J/01Nn7yQl5L0xEJjimGiEBhaoEXFMp\nTlpA0EtpISs3VNherTojuzC3sE49R7KGpAOjvRIKEYSrNCFfKKViz/k/cakCq+eB\nEAy+ZItHRvjph12Q70/JI2YKEDjjYWL8fpFICo+H31IZclKvSltBn5wZAoGAWsGC\nGw8ubZMonYza/+K66w2bb3sR/ByaOQmsDnFND57M6j+8vYdWbJCHV4VGb4lefoY+\niy7UAds0Qoyg1kWJ8bRZJoAectysuZVqU3uwX6dAEY0snVE5w3mAZvYKcRSKQe8b\nxJhcr01Y43m3J+ZFeo8UFoDawBrCaAw3Xr5bPbkCgYBGkp9vdGgy1KClVw/1Vtlv\nj3wKqj/vpAxrAuSIvVdyL7qydW6X73FeqAPkcfcF7JFQySOVZ0weJ1H4eliVPzDW\nVx8taOMXUO2ZzOfrxzgop5107gMNaxAKDgRuFMC55LgsZEPXukHE06XZEj+6ofYa\npK/UzWxFTZgTC0hs6Cs0wA==\n-----END PRIVATE KEY-----\n",
  client_email: "admin-381@systemmonitoring-294918.iam.gserviceaccount.com",
  client_id: "116256051513846171203",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/admin-381%40systemmonitoring-294918.iam.gserviceaccount.com"
};

@Injectable({
  providedIn: 'root'
})
export class PubsubService implements OnInit {
  private pubSubClient = new PubSub();

  constructor(private datadump: DatadumpService) {
    process.env.GCLOUD_PROJECT = 'systemmonitoring-294918';

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });
    this.observe();
  }

  ngOnInit() {
  }

  observe() {
    const subscription = this.pubSubClient.subscription('adminpull');
    subscription.on('message', messageHandler).subscribe(mes =>{
      let infos: Measurement = (JSON.parse(mes.payload.toString()));
      this.datadump.pushFolder(infos);

      let measurement = this.datadump.data.get(infos.SystemInfo.Name);
      if(measurement == undefined)
        this.datadump.data.set(infos.SystemInfo.Name,infos);
      else {
        measurement.Timestamp = infos.Timestamp
        measurement.SystemInfo = { ...infos.SystemInfo }
      }
    });

    const conectionClosedSubscription = this.pubSubClient.subscription('connectionClosed');
    conectionClosedSubscription.on('message', messageHandler).subscribe(mes =>{
      let name : string = (JSON.parse(mes.payload.toString())).Name;
      this.datadump.deleteFolder(name);
      this.datadump.data.delete(name);
    });
  }
}
