import React, { useState } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Avatar, Input, Space } from 'antd';
import {
  UserOutlined,
  FormOutlined,
  SearchOutlined,
  ArrowLeftOutlined,
} from '@ant-design/icons';

import './Sidebar.scss';
import IconBtn from '@components/IconBtn';
import { authSelector } from '@lib/auth';
import { userType } from '@utils/types';
import algoliaIndex from '@utils/algoliaIndex';
import UserCard from '@components/UserCard';
import AuthBtn from '@components/AuthBtn';

const Sidebar: React.FC<RouteComponentProps> = () => {
  const [isSearchFocused, setIsSearchFocused] = useState<boolean>(false);
  const [users, setUsers] = useState<Array<userType>>([]);

  const user = useSelector(authSelector.user);

  const handleSearchOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === '' || undefined || null) {
      setUsers([]);
    } else {
      algoliaIndex.search(e.target.value).then(({ hits }) => {
        const usersWithoutMe = hits.filter((hit) => hit.objectID !== user?.uid);
        setUsers(usersWithoutMe as any);
      });
    }
  };

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
            <AuthBtn user={user} />
            <IconBtn icon={<FormOutlined />} />
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
            onChange={handleSearchOnChange}
          />
        </div>
      </div>
      <div className='sidebar__content'>
        <Space direction='vertical'>
          {users.map((user) => (
            <UserCard user={user} key={user.uid} />
          ))}
        </Space>
      </div>
    </div>
  );
};

export default withRouter(Sidebar);
