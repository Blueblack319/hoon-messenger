import React, { useState } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Input, Space, Typography } from 'antd';
import {
  UserOutlined,
  EllipsisOutlined,
  FormOutlined,
  SearchOutlined,
  ArrowLeftOutlined,
} from '@ant-design/icons';

import './Sidebar.scss';
import IconBtn from '@components/IconBtn';
import { signout } from '@lib/auth';
import { authSelector } from '@lib/auth';
import { getAvatarUrl } from '@lib/db';
// Search bar
// Get and show avatar
// TODO: content -> 임의의 data를 넣어서 layout 확인

const { Text, Title } = Typography;

const Sidebar: React.FC<RouteComponentProps> = ({ history }) => {
  const [isSearchFocused, setIsSearchFocused] = useState<boolean>(false);
  const dispatch = useDispatch();
  const user = useSelector(authSelector.user);

  return (
    <div className='sidebar'>
      <div className='sidebar__header'>
        <div className='header__top'>
          <div className='top__left'>
            <Avatar
              size='large'
              icon={<UserOutlined />}
              className='top__left__avatar'
              src={user?.avatarUrl}
            />
            Chatting
          </div>
          <div className='top__right'>
            <IconBtn
              icon={<EllipsisOutlined style={{ fontSize: '23px' }} />}
              onClick={() => dispatch(signout())}
            />
            <IconBtn
              icon={<FormOutlined />}
              onClick={() => {
                history.push('/signin');
              }}
            />
          </div>
        </div>
        <div className='header__search'>
          {isSearchFocused && <IconBtn icon={<ArrowLeftOutlined />} />}
          <Input
            placeholder='Messenger searching'
            prefix={
              <SearchOutlined
                style={{ fontSize: isSearchFocused ? '0px' : '16px' }}
              />
            }
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
          />
        </div>
      </div>
      <div className='sidebar__content'>
        <Space direction='vertical'>
          <div className='sidebar__userCard'>
            <div className='sidebar__avatar'>
              <Avatar size='large' icon={<UserOutlined />} />
            </div>
            <Space
              direction='vertical'
              className='userCard__container'
              size={0}>
              <Space className='userCard__top'>
                <Title level={4}>Name</Title>
                <Text className='userCard__createdAt'>Created At</Text>
              </Space>
              <Text>content</Text>
            </Space>
          </div>
        </Space>
      </div>
    </div>
  );
};

export default withRouter(Sidebar);
