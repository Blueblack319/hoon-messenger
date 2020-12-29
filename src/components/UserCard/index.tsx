import React from 'react';
import { Avatar, Space, Typography } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import './UserCard.scss';
import { userType } from '@utils/types';
import { withRouter, RouteComponentProps } from 'react-router-dom';

const { Title, Text } = Typography;

interface UserCardProps extends RouteComponentProps {
  user: userType;
}

const UserCard: React.FC<UserCardProps> = ({ user, history }) => {
  return (
    <div
      className='userCard'
      onClick={() => history.push(`/messenger/${user.uid}`)}>
      <div className='userCard__avatar'>
        <Avatar size='large' icon={<UserOutlined />} />
      </div>
      <Space direction='vertical' className='userCard__container' size={0}>
        <Space className='userCard__top'>
          <Title level={4}>{user.name}</Title>
          <Text className='userCard__createdAt'>Created At</Text>
        </Space>
        <Text className='userCard__content'>content</Text>
      </Space>
    </div>
  );
};

export default withRouter(UserCard);
