import React from 'react';
import { Button } from 'antd';

import './IconBtn.scss';

interface IconBtnProps {
  icon: React.ReactNode;
}

const IconBtn: React.FC<IconBtnProps> = ({ icon }) => (
  <Button
    shape='circle'
    icon={icon}
    type='primary'
    className='iconBtn'
    size='large'
  />
);

export default IconBtn;
