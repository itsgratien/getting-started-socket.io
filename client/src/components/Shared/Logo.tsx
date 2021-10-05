import React from 'react';
import logo from '../../assets/logo.png';
import style from './Shared.module.scss';
import classname from 'classnames';

export const Logo = () => {
  return (
    <div className={classname('flex items-center', style.logo)}>
      <img src={logo} alt='logo' />
      <span className='font-bold'>Chat</span>
    </div>
  );
};
