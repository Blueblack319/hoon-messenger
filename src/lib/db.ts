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
    const res = await dbService.collection('users').doc(uid).get();
    return res.data()!.avatarUrl;
  } catch (err) {
    throw new Error(err.message);
  }
};

export const getUser = async (word: string) => {
  try {
    // const res = await dbService.collection('users').doc()
  } catch (err) {
    throw new Error(err.message);
  }
};
