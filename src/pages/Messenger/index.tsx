import React, { useEffect, useState } from 'react';
import { Avatar, Typography, Button, Input } from 'antd';
import {
  PhoneFilled,
  VideoCameraFilled,
  InfoCircleFilled,
  PlusCircleFilled,
  SmileFilled,
  LikeFilled,
} from '@ant-design/icons';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import './Messenger.scss';
import Sidebar from '@components/Sidebar';
import { useSelector } from 'react-redux';
import { authSelector } from '@lib/auth';
import { userType } from '@utils/types';
import { getUser } from '@lib/db';
import IconBtnBlue from '@components/IconBtnBlue';

const { Title } = Typography;

interface MatchParams {
  uid: string;
}

const Messenger: React.FC<RouteComponentProps<MatchParams>> = ({ match }) => {
  const [counterpart, setCounterpart] = useState<null | userType>(null);
  const user = useSelector(authSelector.user);
  useEffect(() => {
    async function getCounterpart(uid: string) {
      const user = (await getUser(uid)) as userType;
      setCounterpart(user);
    }
    getCounterpart(match.params.uid);
    // eslint-disable-next-line
  }, []);

  return (
    <div className='messengerLayout'>
      <div className='messengerLayout__sidebar'>
        <Sidebar />
      </div>
      <div className='messenger'>
        <div className='messenger__header'>
          <div className='header__left'>
            <Avatar size='large' src={counterpart?.avatarUrl} />
            <Title level={4}>{counterpart?.name}</Title>
          </div>
          <div className='header__right'>
            <IconBtnBlue icon={<PhoneFilled style={{ fontSize: '20px' }} />} />
            <IconBtnBlue
              icon={<VideoCameraFilled style={{ fontSize: '20px' }} />}
            />
            <IconBtnBlue
              icon={<InfoCircleFilled style={{ fontSize: '20px' }} />}
            />
          </div>
        </div>
        <div className='messenger__content'>content</div>
        <div className='messenger__footer'>
          <div className='footer__left'>
            <IconBtnBlue
              icon={<PlusCircleFilled style={{ fontSize: '20px' }} />}
            />
          </div>
          <div className='footer__center'>
            <Input
              placeholder='Aa'
              suffix={
                <SmileFilled style={{ fontSize: '18px', color: '#1890ff' }} />
              }
            />
          </div>
          <div className='footer__right'>
            <IconBtnBlue icon={<LikeFilled style={{ fontSize: '20px' }} />} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Messenger);
