import React, { useEffect, useState } from 'react';
import { Avatar, Typography, Input } from 'antd';
import {
  PhoneFilled,
  VideoCameraFilled,
  InfoCircleFilled,
  PlusCircleFilled,
  SmileFilled,
  LikeFilled,
} from '@ant-design/icons';
import { RouteComponentProps, withRouter, Redirect } from 'react-router-dom';

import './Messenger.scss';
import Sidebar from '@components/Sidebar';
import { useSelector } from 'react-redux';
import { authSelector } from '@lib/auth';
import { dbService } from '@lib/firebase';
import { userType } from '@utils/types';
import { createMessenger, getUser, getMessengerId, addMessage } from '@lib/db';
import IconBtnBlue from '@components/IconBtnBlue';
import UserMessage from './UserMessage';
import CounterpartMessage from './CounterpartMessage';

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
      const messengerId = await getMessengerId(uid1, uid2);
      setCounterpart(user);
      setMessengerId(messengerId!);
    }
    if (user !== null) {
      getCounterpart(user?.uid!, match.params.uid);
    }
  }, [match.params.uid, user?.uid, user]);

  useEffect(() => {
    if (messengerId) {
      // console.log는 실행되지 않는데 왜 messages는 update되는 거지??
      console.log(messengerId);
      dbService
        .collection('messengers')
        .doc(messengerId!)
        .onSnapshot((doc) => {
          let messages;
          const data = doc.data();
          if (data?.messages) {
            messages = data.messages.sort(
              (a: any, b: any) =>
                new Date(a.createdAt).getTime() -
                new Date(b.createdAt).getTime(),
            );
          } else {
            messages = [];
          }
          setMessages(messages);
        });
    }
  }, [messengerId]);

  const handleEnter = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (!messengerId) {
        await createMessenger(user?.uid!, match.params.uid, inputVal);
        const messengerId = await getMessengerId(user?.uid!, match.params.uid);
        setMessengerId(messengerId!);
      } else {
        await addMessage(
          user?.uid!,
          e.currentTarget.value,
          new Date().toISOString(),
          messengerId,
        );
      }
      setInputVal('');
    }
  };

  const handleInputOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputVal(e.target.value);
  };

  if (user === null) {
    return <Redirect to='/' />;
  }

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
          {!messengerId ? (
            <div className='content__default'>
              {' '}
              <Avatar src={counterpart?.avatarUrl} size={60} />
              <Title level={3}>{counterpart?.name}</Title>{' '}
            </div>
          ) : (
            <div className='messenger__messages'>
              {messages?.map((message, index, arr) => {
                if (message.uid === user?.uid) {
                  return (
                    <UserMessage
                      key={message.createdAt}
                      text={message.text}
                      createdAt={message.createdAt}
                    />
                  );
                } else {
                  let avatarUrl = null;
                  if (arr[index - 1]?.uid !== counterpart?.uid) {
                    avatarUrl = counterpart?.avatarUrl;
                  }
                  return (
                    <CounterpartMessage
                      key={message.createdAt}
                      text={message.text}
                      createdAt={message.createdAt}
                      avatarUrl={avatarUrl}
                    />
                  );
                }
              })}
            </div>
          )}
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
