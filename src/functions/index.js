/**
 * Copyright 2017 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// Import the Firebase SDK for Google Cloud Functions.
const functions = require('firebase-functions');
// Import and initialize the Firebase Admin SDK.
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

const Storage = require('@google-cloud/storage');
const vision = require('@google-cloud/vision');
const exec = require('child-process-promise').exec;

const visionClient = new vision.ImageAnnotatorClient();
const storageClient = new Storage();

const language = require('@google-cloud/language');
const languageClient = new language.LanguageServiceClient();

exports.sendEvents = functions.https.onCall((req, res) => {
  var events = [
    {
      "eventName": "Aggie Cru Pizza Social",
      "user": "aggiecru@tamu.edu",
      "sanctioned": True,
      "startTime": "2019-09-08T17:00:00+00:00",
      "endTime":"2019-09-08T18:00:00+00:00",
      "description": "Come meet other Aggies and enjoy free food! We will be providing free pizza and drinks along with games to play afterward.",
      "location": "Academic Plaza",
      "organization": "Cru",
      "meetsCriteria" : True
    },
    {
      "eventName": "ICPC Programming Contest",
      "user": "tannerhoke@tamu.edu",
      "sanctioned": False,
      "startTime": "2019-09-08T18:00:00+00:00",
      "endTime": "2019-09-08T22:00:00+00:00",
      "description": "Try your hand at coding and come to the ICPC Programming contest! Food and drinks will be provided to all contestants. Sign up for the competition at icpc.com/register.",
      "location": "MSC 1400",
      "organization": "ICPC",
      "meetsCriteria":True
    },
    {
      "eventName": "TANSA Informational",
      "user": "TANSAAggies@tamu.edu",
      "sanctioned": True,
      "startTime": "2019-09-08T17:30:00+00:00",
      "endTime": "2019-09-08T18:30:00+00:00",
      "description": "Learn more about what TANSA does and how you can help! Canes will be served.",
      "location": "MSC 1423",
      "organization": "TANSA",
      "meetsCriteria":True
    },
    {
      "eventName": "Course Scheduling Social",
      "user": "dannyboy@gmail.com",
      "sanctioned": False,
      "startTime": "2019-09-08T23:00:00+00:00",
      "endTime": "2019-09-09T00:30:00+00:00",
      "description": "There's free ice cream if you come to the course scheduling social. You must be a member of EH to attend.",
      "location": "ZACH 201",
      "organization": "Engineering Honors",
      "meetsCriteria":True
    },
    {
      "eventName": "Bro Brunch",
      "user": "aggiemensclub@gmail.com",
      "sanctioned": False,
      "startTime": "2019-09-12T15:30:00+00:00",
      "endTime": "2019-09-12T16:30:00+00:00",
      "description": "Get to meet some great bros and dine fine with free pancakes and eggs",
      "location": "MSC 104",
      "organization": "Aggie Men's Club",
      "meetsCriteria":True
    },
    {
      "eventName": "BSM Free Lunch",
      "user": "imatson9119@tamu.edu",
      "sanctioned": False,
      "startTime": "2019-09-11T17:30:00+00:00",
      "endTime": "2019-09-11T19:00:00+00:00",
      "description": "Come enjoy free lunch at the Baptist Student Ministry- meet some new friends and enjoy a free meal!",
      "location": "Northgate",
      "organization": "Baptist Student Ministry",
      "meetsCriteria":True
    },
    {
      "eventName": "MSC Fish Informational",
      "user": "mscfish@tamu.edu",
      "sanctioned": True,
      "startTime": "2019-09-14T22:00:00+00:00",
      "endTime": "2019-09-14T24:00:00+00:00",
      "description": "An informational for MSC Fish, a Freshman Leadership organization (FLO). Dinner will be provided.",
      "location": "Rudder Auditorium",
      "organization": "MSC Fish",
      "meetsCriteria":False
    },
    {
      "eventName": "Fish Aides Informational",
      "user": "travis.cantwell@tamu.edu",
      "sanctioned": False,
      "startTime": "2019-09-17T17:00:00+00:00",
      "endTime": "2019-09-17T19:00:00+00:00",
      "description": "An informational for Fish Aides, a Freshman Leadership organization (FLO). Lunch will be provided.",
      "location": "ZACH 410",
      "organization": "Fish Aides",
      "meetsCriteria":False
    },
    {
      "eventName": "Intramural Sports Social",
      "user": "intramuralsportsoffice@tamu.edu",
      "sanctioned": True,
      "startTime": "2019-09-19T19:00:00+00:00",
      "endTime": "2019-09-19T21:30:00+00:00",
      "description": "Come learn about intramural sports and enjoy free lunch!",
      "location": "Student Rec Center 102",
      "organization": "Intramural Sports Office",
      "meetsCriteria":False
    },
    {
      "eventName": "Fall Programming Competition",
      "user": "hoke_t@icloud.com",
      "sanctioned": False,
      "startTime": "2019-09-15T12:30:00+00:00",
      "endTime": "2019-09-15T21:45:00+00:00",
      "description": "CSCE Fall Programming Competition. Snacks will be provided!",
      "location": "ZACH Chevron Room",
      "organization": "CSCE Department",
      "meetsCriteria":False
    }
  ];

  return events;
});

// Adds a message that welcomes new users into the chat.
exports.addWelcomeMessages = functions.auth.user().onCreate((user) => {
  console.log('A new user signed in for the first time.');
  const fullName = user.displayName || 'Anonymous';

  // Saves the new welcome message into the database
  // which then displays it in the FriendlyChat clients.
  return admin.database().ref('messages').push({
    name: 'Firebase Bot',
    photoUrl: '/assets/images/firebase-logo.png', // Firebase logo
    text: `${fullName} signed in for the first time! Welcome!`
  });
});


// Sends a notifications to all users when a new message is posted.
exports.sendNotifications = functions.database.ref('/messages/{messageId}').onWrite((change, context) => {
  // Only send a notification when a message has been created.
  if (change.before.val()) {
    return;
  }

  // Notification details.
  const original = change.after.val();
  const text = original.text;
  const payload = {
    notification: {
      title: `${original.name} posted ${text ? 'a message' : 'an image'}`,
      body: text ? (text.length <= 100 ? text : text.substring(0, 97) + '...') : '',
      icon: original.photoUrl || '/assets/images/profile_placeholder.png',
      click_action: `https://${functions.config().firebase.authDomain}`
    }
  };

  // Get the list of device tokens.
  return admin.database().ref('fcmTokens').once('value').then(allTokens => {
    if (allTokens.val()) {
      // Listing all tokens.
      const tokens = Object.keys(allTokens.val());

      // Send notifications to all tokens.
      return admin.messaging().sendToDevice(tokens, payload).then(response => {
        // For each message check if there was an error.
        const tokensToRemove = [];
        response.results.forEach((result, index) => {
          const error = result.error;
          if (error) {
            console.error('Failure sending notification to', tokens[index], error);
            // Cleanup the tokens who are not registered anymore.
            if (error.code === 'messaging/invalid-registration-token' ||
                error.code === 'messaging/registration-token-not-registered') {
              tokensToRemove.push(allTokens.ref.child(tokens[index]).remove());
            }
          }
        });
        return Promise.all(tokensToRemove);
      });
    }
  });
});

// Annotates messages using the Cloud Natural Language API
exports.annotateMessages = functions.database.ref('/messages/{messageId}').onWrite((change, context) => {
  const messageId = context.params.messageId;

  // Only annotate new messages.
  if (change.before.exists()) {
    return null;
  }

  // Annotation arguments.
  const original = change.after.val();
  const request = {
    document: {
      content: original.text,
      type: 'PLAIN_TEXT'
    },
    features: {
      extractDocumentSentiment: true,
      extractEntities: true
    }
  };

  console.log('Annotating new message.');

  // Detect the sentiment and entities of the new message.
  return languageClient.annotateText(request)
    .then((result) => {
      console.log('Saving annotations.');

      // Update the message with the results.
      return admin.database().ref(`/messages/${messageId}`).update({
        sentiment: result[0].documentSentiment,
        entities: result[0].entities.map((entity) => {
          return {
            name: entity.name,
            salience: entity.salience
          };
        })
      });
    });
});