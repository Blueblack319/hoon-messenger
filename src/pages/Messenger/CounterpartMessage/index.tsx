import React from 'react';
import moment from 'moment';
import { Avatar } from 'antd';

import './CounterpartMessage.scss';

interface CounterpartMessageProps {
  text: string;
  createdAt: string;
  avatarUrl: string | null | undefined;
}

const CounterpartMessage: React.FC<CounterpartMessageProps> = ({
  text,
  createdAt,
  avatarUrl,
}) => {
  return (
    <div className='counterpartMessage'>
      {avatarUrl ? (
        <Avatar src={avatarUrl} className='counterpartMessage__avatar' />
      ) : null}
      <div className='counterpartMessage__textBox'>{text}</div>
      <div className='counterpartMessage__time'>
        {moment(createdAt).format('LT')}
      </div>
    </div>
  );
};

export default CounterpartMessage;
