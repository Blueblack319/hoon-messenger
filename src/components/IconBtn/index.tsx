import React from 'react';
import { Button } from 'antd';

import './IconBtn.scss';

interface IconBtnProps {
  icon: React.ReactNode;
  onClick?:
    | ((event: React.MouseEvent<HTMLElement, MouseEvent>) => void)
    | undefined;
}

const IconBtn: React.FC<IconBtnProps> = ({ icon, onClick }) => (
  <Button
    shape='circle'
    icon={icon}
    type='primary'
    className='iconBtn'
    size='large'
    onClick={onClick}
  />
);

export default IconBtn;
