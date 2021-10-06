import React, { useState } from 'react';
import { Logo, UnAuthLayout } from '../Shared';
import style from './Auth.module.scss';
import classname from 'classnames';
import { action, LocalStorage } from '../../utils';

export const Login = () => {
  const [username, setUsername] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setUsername(e.target.value);

  const handleSubmit = (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();

    return action(
      { method: 'POST', path: '/', data: { username } },
      (res) => {
        if (res.token) {
          localStorage.setItem(LocalStorage.Token, res.token);

          window.location.href = '/message';
        }
      },
      (e) => {
        console.log('error', e);
      }
    );
  };

  return (
    <UnAuthLayout>
      <div className='container mx-auto'>
        <div
          className={classname(
            'w-full relative flex flex-col pt-10',
            style.login
          )}
        >
          <Logo />
          <form
            className={classname('flex flex-col', style.loginForm)}
            autoComplete='off'
            onSubmit={handleSubmit}
          >
            <input
              type='text'
              placeholder='username'
              value={username}
              onChange={handleChange}
              className={classname('w-full outline-none focus:outline-none')}
              required
            />
            <button
              type='submit'
              className={classname(
                'w-full outline-none focus:outline-none text-white font-bold',
                style.loginBtn
              )}
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </UnAuthLayout>
  );
};
