import React from 'react';
import style from './Message.module.scss';
import classname from 'classnames';

interface Props {}

export const MessageDetail = (props: Props) => {
  return (
    <div className={classname('relative', style.messageDetail)}>
      <div className={classname('relative', style.chats)}>
        <ul>
          <li className='relative flex flex-col'>
            <span className={classname('font-bold')}>Gratien</span>
            <span className={classname('mt-1', style.msg)}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia
              molestias ad quisquam et. Necessitatibus accusantium veritatis
              rerum illum fugiat nulla, voluptatibus repellendus inventore
              repellat velit quae, accusamus ipsum quam sed.
            </span>
            <div className={classname('absolute top-0 right-0', style.date)}>
              <small>{new Date().toDateString()}</small>
            </div>
          </li>
        </ul>
      </div>
      <div
        className={classname('absolute bottom-0 left-0 right-0', style.reply)}
      >
        <textarea
          className={classname('outline-none focus:outline-none')}
          placeholder='Write message'
        ></textarea>
        <button
          type='button'
          className={classname('outline-none focus:outline-none')}
        >
          Reply
        </button>
      </div>
    </div>
  );
};
