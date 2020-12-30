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
import { dbService } from '@lib/firebase';
import { userType } from '@utils/types';
import {
  createMessenger,
  getUser,
  getMessenger,
  listenMessenger,
} from '@lib/db';
import IconBtnBlue from '@components/IconBtnBlue';

// default content
// create messengerId
// push message
// TODO: set onSnapshot
// TODO: Counterpart Message UI
// TODO: User Message UI
// TODO: check onSnapshot
// TODO: get message
// TODO: message UI
// TODO: check working well(2 users)

const { Title } = Typography;

interface MatchParams {
  uid: string;
}

type messageType = {
  uid: string;
  text: string;
  createdAt: string;
};

const Messenger: React.FC<RouteComponentProps<MatchParams>> = ({ match }) => {
  const [counterpart, setCounterpart] = useState<null | userType>(null);
  const [inputVal, setInputVal] = useState<string>('');
  const [messengerId, setMessengerId] = useState<null | string>(null);
  const [messages, setMessages] = useState<null | messageType[]>(null);
  const user = useSelector(authSelector.user);

  useEffect(() => {
    async function getCounterpart(uid1: string, uid2: string) {
      const user = (await getUser(uid2)) as userType;
      const messengerId = await getMessenger(uid1, uid2);

      setCounterpart(user);
      setMessengerId(messengerId);
    }
    getCounterpart(user?.uid!, match.params.uid);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (messengerId) {
      dbService
        .collection('messengers')
        .doc(messengerId!)
        .onSnapshot((doc) => {
          setMessages(doc.data()!.messages);
        });
    }
  });

  const handleEnter = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (messengerId === null) {
        await createMessenger(user?.uid!, match.params.uid, inputVal);
        const messengerId = await getMessenger(user?.uid!, match.params.uid);
        setMessengerId(messengerId);
      } else {
      }
      setInputVal('');
    }
  };

  const handleInputOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputVal(e.target.value);
  };

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
        <div className='messenger__content'>
          <div className='content__default'>
            {!messengerId ? (
              <>
                {' '}
                <Avatar src={counterpart?.avatarUrl} size={60} />
                <Title level={3}>{counterpart?.name}</Title>{' '}
              </>
            ) : (
              messages?.map((message) => {
                if (message.uid === user?.uid) {
                  return <div key={message.createdAt}>user text</div>;
                } else {
                  return <div key={message.createdAt}>counterpart texts</div>;
                }
              })
            )}
          </div>
        </div>
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
              onKeyPress={handleEnter}
              onChange={handleInputOnChange}
              value={inputVal}
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
