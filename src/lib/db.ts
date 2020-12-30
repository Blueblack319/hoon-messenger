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

export const getMessages = async (uid1: string, uid2: string) => {
  try {
    const messages = await dbService
      .collection('messengers')
      .where('users', '==', [uid1, uid2])
      .get()
      .then((querySnapshot) => {
        return querySnapshot.docs[0].data().messages;
      })
      .catch((err) => {
        return null;
      });
    return messages;
  } catch (err) {
    throw new Error(err.message);
  }
};
