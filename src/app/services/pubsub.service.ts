import { Injectable } from '@angular/core';
const subscriptionName = 'systemInfoSubscription';
const timeout = 60;
// Imports the Google Cloud client library
const {PubSub} = require('@google-cloud/pubsub');

@Injectable({
  providedIn: 'root'
})
export class PubsubService {

  constructor() {
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
