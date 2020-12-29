import React, { useEffect, useState } from 'react';
import { Avatar, Typography, Button, Input } from 'antd';
import {
  PhoneFilled,
  VideoCameraFilled,
  InfoCircleFilled,
  PlusCircleFilled,
  SmileFilled,
} from '@ant-design/icons';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import './Messenger.scss';
import Sidebar from '@components/Sidebar';
import { useSelector } from 'react-redux';
import { authSelector } from '@lib/auth';
import { userType } from '@utils/types';
import { getUser } from '@lib/db';

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
            <Button shape='circle' icon={<PhoneFilled />} />
            <Button shape='circle' icon={<VideoCameraFilled />} />
            <Button shape='circle' icon={<InfoCircleFilled />} />
          </div>
        </div>
        <div className='messenger__content'>content</div>
        <div className='messenger__footer'>
          <div className='footer__left'>
            <Button
              shape='circle'
              icon={<PlusCircleFilled style={{ fontSize: '20px' }} />}
              size='large'
            />
          </div>
          <div className='footer__right'>
            <Input
              placeholder='Aa'
              suffix={
                <SmileFilled style={{ fontSize: '18px', color: '#1890ff' }} />
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Messenger);
