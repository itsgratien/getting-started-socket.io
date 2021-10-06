import React from 'react';
import style from './Message.module.scss';
import { Logo, AuthLayout, AuthContext } from '../Shared';
import classname from 'classnames';
import { OnlineUsers } from './OnlineUsers';
import { MessageDetail } from './MessageDetail';
import { LocalStorage, Route } from '../../utils';

export const Message = () => {
  const ctx = React.useContext(AuthContext);

  const handleLogout = () => {
    localStorage.removeItem(LocalStorage.Token);

    window.location.href = Route.Home;
  };

  return (
    <AuthLayout>
      <header
        className={classname(
          'fixed w-full top-0 right-0 left-0 bg-white',
          style.header
        )}
      >
        <div className={classname('container mx-auto flex justify-between')}>
          <Logo />
          <button
            type='button'
            className={classname(
              'outline-none focus:outline-none font-bold',
              style.logoutButton
            )}
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </header>
      <div className={style.messages}>
        <OnlineUsers />
        <MessageDetail />
      </div>
    </AuthLayout>
  );
};
