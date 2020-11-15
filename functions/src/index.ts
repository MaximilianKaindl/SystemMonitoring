import * as functions from 'firebase-functions';
const admin = require('firebase-admin');
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//

admin.initializeApp();

export const helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});
exports.helloPubSub = functions.pubsub.topic('systeminfo').onPublish((message) => {
  functions.logger.info("Hello logs!", {structuredData: true});
});