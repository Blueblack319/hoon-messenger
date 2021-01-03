import React from 'react';
import moment from 'moment';

import './UserMessage.scss';

interface UserMessageProps {
  text: string;
  createdAt: string;
}

const UserMessage: React.FC<UserMessageProps> = ({ text, createdAt }) => {
  return (
    <div className='userMessage'>
      <div className='userMessage__time'>{moment(createdAt).format('LT')}</div>
      <div className='userMessage__textBox'>{text}</div>
    </div>
  );
};

export default UserMessage;
