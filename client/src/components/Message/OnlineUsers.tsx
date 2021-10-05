import React from 'react';
import style from './Message.module.scss';

interface Props {}

export const OnlineUsers = (props: Props) => {
  return (
    <div className={style.onlineUsers}>
      <ul>
        <li>
          <span>Gratien</span>
          <span></span>
        </li>
      </ul>
    </div>
  );
};
