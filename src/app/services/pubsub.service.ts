import { Injectable } from '@angular/core';
const subscriptionName = 'systemInfoSubscription';
const timeout = 60;
// Imports the Google Cloud client library
const {PubSub} = require('@google-cloud/pubsub');

const serviceAccount = require('D:/HTL/4AHIF/NVS-Lack/SystemMonitoring/src/assets/SystemMonitoring-4f59a3f991eb.json');
const admin = require('firebase-admin');

@Injectable({
  providedIn: 'root'
})
export class PubsubService {

  constructor() {
    process.env.GCLOUD_PROJECT = 'systemmonitoring-294918';

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });
    this.listenForMessages();
  }

  pubSubClient = new PubSub();
  listenForMessages() {
    const subscription = this.pubSubClient.subscription(subscriptionName);
    let messageCount = 0;
    const messageHandler = message => {
      console.log(`Received message ${message.id}:`);
      console.log(`\tData: ${message.data}`);
      console.log(`\tAttributes: ${message.attributes}`);
      messageCount += 1;
      message.ack();
    };
    subscription.on('message', messageHandler);

    setTimeout(() => {
      subscription.removeListener('message', messageHandler);
      console.log(`${messageCount} message(s) received.`);
    }, timeout * 1000);
  }
}
