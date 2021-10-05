import React from 'react';
import style from './Message.module.scss';
import classname from 'classnames';

interface Props {}

export const OnlineUsers = (props: Props) => {
  return (
    <div className={style.onlineUsers}>
      <ul>
        <li className='relative'>
          <span>Gratien</span>
          <div
            className={classname('absolute right-0 bottom-0', style.online)}
          ></div>
        </li>
        <li className='relative'>
          <span>Gratien</span>
          <div
            className={classname('absolute right-0 bottom-0', style.online)}
          ></div>
        </li>
      </ul>
    </div>
  );
};
