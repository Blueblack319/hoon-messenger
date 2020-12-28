import React, { useState } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Avatar, Input, Space } from 'antd';
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
// Search bar
// TODO: content -> 임의의 data를 넣어서 layout 확인
// TODO:

const Sidebar: React.FC<RouteComponentProps> = ({ history }) => {
  const [isSearchFocused, setIsSearchFocused] = useState<boolean>(false);
  const dispatch = useDispatch();

  return (
    <div className='sidebar'>
      <div className='sidebar__header'>
        <div className='header__top'>
          <div className='top__left'>
            <Avatar
              size='large'
              icon={<UserOutlined />}
              className='top__left__avatar'
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
        <Space direction='vertical'></Space>
      </div>
    </div>
  );
};

export default withRouter(Sidebar);
