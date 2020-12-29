import { dbService } from './firebase';

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
