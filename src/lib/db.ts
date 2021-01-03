import { dbService, firebaseInstance } from './firebase';

export const createUser = async (data: any, uid: string) => {
  try {
    await dbService
      .collection('users')
      .doc(uid)
      .set({ uid, ...data }, { merge: true });
  } catch (err) {
    throw new Error(err.message);
  }
};

export const getAvatarUrl = async (uid: string) => {
  try {
    const user = await dbService.collection('users').doc(uid).get();
    return user.data()!.avatarUrl;
  } catch (err) {
    throw new Error(err.message);
  }
};

export const getUser = async (uid: string) => {
  try {
    const user = await dbService.collection('users').doc(uid).get();
    return user.data();
  } catch (err) {
    throw new Error(err.message);
  }
};

const updateUser = async (messengerId: string, uid: string) => {
  try {
    await dbService
      .collection('users')
      .doc(uid)
      .update({
        messengers: firebaseInstance.firestore.FieldValue.arrayUnion(
          messengerId,
        ),
      });
  } catch (err) {
    throw new Error(err.message);
  }
};

export const createMessenger = async (
  uid1: string,
  uid2: string,
  text: string,
) => {
  try {
    const messengerRef = dbService.collection('messengers').doc();
    await messengerRef.set({
      users: [uid1, uid2],
      messages: [{ uid: uid1, text, createdAt: new Date().toISOString() }],
    });
    await updateUser(messengerRef.id, uid1);
    await updateUser(messengerRef.id, uid2);
  } catch (err) {
    throw new Error(err.message);
  }
};

const getMessengerIdByUid = async (uid1: string, uid2: string) => {
  let id;
  const messenger = await dbService
    .collection('messengers')
    .where('users', '==', [uid1, uid2])
    .get();
  messenger.docs.forEach((doc) => (id = doc.id));
  return id;
};

export const getMessengerId = async (uid1: string, uid2: string) => {
  try {
    let id = await getMessengerIdByUid(uid1, uid2);
    if (id === undefined) {
      id = await getMessengerIdByUid(uid2, uid1);
    }
    return id;
  } catch (err) {
    throw new Error(err.message);
  }
};

export const addMessage = (
  uid: string,
  text: string,
  createdAt: string,
  messengerId: string,
) => {
  try {
    const messengerRef = dbService.collection('messengers').doc(messengerId);
    messengerRef.update({
      messages: firebaseInstance.firestore.FieldValue.arrayUnion({
        uid,
        text,
        createdAt,
      }),
    });
  } catch (err) {
    throw new Error(err.message);
  }
};
