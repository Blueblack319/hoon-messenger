import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Dispatch } from 'react';
import Cookies from 'js-cookie';

import { signinType, signupType } from '@utils/types';
import { authService } from './firebase';
import { createUser } from './db';
import { RootState } from 'src/store';

interface stateType {
  isLoading?: boolean;
  error?: null | string;
  user?: null | object;
}

// Slice
const name = 'AUTH';

const initialState = {
  isLoading: false,
  error: null,
  user: null,
};

const reducers = {
  authStart: (state: stateType) => {
    state.isLoading = false;
  },
  signinSuccess: (state: stateType, { payload }: PayloadAction<stateType>) => {
    state.isLoading = false;
    state.user = payload.user;
    state.error = null;
  },
  signinFail: (state: stateType, { payload }: PayloadAction<stateType>) => {
    state.isLoading = false;
    state.error = payload.error;
    state.user = null;
  },
  signoutSuccess: (state: stateType) => {
    state.isLoading = false;
    state.user = null;
    state.error = null;
  },
};
const slice = createSlice({
  name,
  initialState,
  reducers,
});

const selectLoadingState = createSelector(
  (state: stateType) => state.isLoading,
  (isLoading) => isLoading,
);

const selectUserState = createSelector(
  (state: stateType) => state.user,
  (user) => user,
);

const selectErrorState = createSelector(
  (state: stateType) => state.error,
  (error) => error,
);

const selectAllState = createSelector(
  selectLoadingState,
  selectUserState,
  selectErrorState,
  (isLoading, user, error) => {
    return { isLoading, user, error };
  },
);

export const authSelector = {
  isLoading: (state: RootState) => selectLoadingState(state[AUTH]),
  user: (state: RootState) => selectUserState(state[AUTH]),
  error: (state: RootState) => selectErrorState(state[AUTH]),
  all: (state: RootState) => selectAllState(state[AUTH]),
};

export const AUTH = slice.name;
export const authReducer = slice.reducer;

// TODO: Actions
const { authStart, signinSuccess, signinFail, signoutSuccess } = slice.actions;

const formatUser = async (user: any) => {
  return {
    uid: user.uid,
    email: user.email,
    name: user.displayName,
    firstName: user.firstName ? user.firstName : null,
    lastName: user.lastName ? user.lastName : null,
    token: user.ya,
    provider: user.providerData[0]?.providerId,
    avatarUrl: user.photoURL ? user.photoURL : null,
  };
};

export const signupWithEmail = (values: signupType) => async (
  dispatch: Dispatch<PayloadAction | PayloadAction<stateType>>,
) => {
  try {
    // dispatch signinSuccess
    dispatch(authStart());
    const res = await authService.createUserWithEmailAndPassword(
      values.email,
      values.password,
    );
    const user = await formatUser({
      ...res.user,
      displayName: values.displayName,
      firstName: values.firstName,
      lastName: values.lastName,
      photoURL: values.avatarUrl,
    });
    const { token, ...userWithoutToken } = user;
    Cookies.set('token', token, { expires: 1 });

    // create user @ db
    await createUser(userWithoutToken, user.uid);
    dispatch(signinSuccess({ user }));
  } catch (err) {
    dispatch(signinFail({ error: err.message }));
  }
};

export const signinWithEmail = (values: signinType) => async (
  dispatch: Dispatch<PayloadAction | PayloadAction<stateType>>,
) => {
  try {
    // dispatch signinSuccess
    dispatch(authStart());
    const res = await authService.signInWithEmailAndPassword(
      values.email,
      values.password,
    );
    const user = await formatUser(res.user);
    const { token } = user;
    Cookies.set('token', token, { expires: 1 });

    dispatch(signinSuccess({ user }));
  } catch (err) {
    dispatch(signinFail({ error: err.message }));
  }
};

export const signout = () => async (dispatch: Dispatch<PayloadAction>) => {
  try {
    dispatch(authStart());
    await authService.signOut();
    Cookies.remove('token');
    dispatch(signoutSuccess());
  } catch (err) {
    throw new Error(err.message);
  }
};
