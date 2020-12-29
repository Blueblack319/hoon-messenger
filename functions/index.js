const functions = require('firebase-functions');
const algoliasearch = require('algoliasearch');

const APP_ID = functions.config().algolia.app;
const ADDMIN_KEY = functions.config().algolia.key;

const client = algoliasearch(APP_ID, ADDMIN_KEY);
const index = client.initIndex('users');

exports.addToIndex = functions.firestore
  .document('users/{uid}')
  .onCreate((snapshot) => {
    const data = snapshot.data();
    const objectID = snapshot.id;

    return index.saveObject(
      { ...data, objectID },
      { autoGenerateObjectIDIfNotExist: true },
    );
  });

exports.updateIndex = functions.firestore
  .document('users/{uid}')
  .onUpdate((change) => {
    const newData = change.after.data();
    const objectID = change.after.id;

    return index.saveObject({ ...newData, objectID });
  });

exports.deleteFromIndex = functions.firestore
  .document('users/{uid}')
  .onDelete((snapshot) => index.deleteObject(snapshot.id));
