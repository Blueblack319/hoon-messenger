import React from 'react';
import { Avatar } from 'antd';
import {
  UserOutlined,
  EllipsisOutlined,
  FormOutlined,
} from '@ant-design/icons';

import './Sidebar.scss';
import IconBtn from '@components/IconBtn';

interface sidebarProps {}

const Sidebar: React.FC<sidebarProps> = ({}) => {
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
            <IconBtn icon={<EllipsisOutlined style={{ fontSize: '23px' }} />} />
            <IconBtn icon={<FormOutlined />} />
          </div>
        </div>
        <div className='header__search'>Search Bar</div>
      </div>
      <div className='sidebar__content'></div>
    </div>
  );
};

export default Sidebar;
