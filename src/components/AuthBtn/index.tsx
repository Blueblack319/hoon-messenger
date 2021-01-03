import React from 'react';
import { Button } from 'antd';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { userType } from '@utils/types';
import { signout } from '@lib/auth';
import './AuthBtn.scss';

interface AuthBtnProps extends RouteComponentProps {
  user: null | userType | undefined;
}

const AuthBtn: React.FC<AuthBtnProps> = ({ user, history }) => {
  const dispatch = useDispatch();
  if (user !== null) {
    return (
      <Button className='authBtn' onClick={() => dispatch(signout())}>
        Sign out
      </Button>
    );
  } else {
    return (
      <Button
        className='authBtn'
        onClick={() => {
          history.push('/signin');
        }}>
        Sign in
      </Button>
    );
  }
};

export default withRouter(AuthBtn);
