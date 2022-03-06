import { TextField, TextFieldOnChangeArguments } from '@consta/uikit/TextField';
import { Button } from '@consta/uikit/Button';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { cn } from '../../../__private__/utils/bem';
import { AuthData, AuthProps } from '../types';
import { setUser } from '../../../store/reducers/authReducer';
import { useRequests } from '../../../hooks/useRequests/useRequests';
import { useFocus } from '../../../hooks/useFocus/useFocus';

import './AuthSignUp.scss';

const cnAuthSignUp = cn('AuthSignUp');

type Error = {
  type: keyof AuthData<'signup'>;
  message?: string;
};

const isValidData = (data: AuthData<'signup'>): Error | boolean => {
  const { email, login, password, re_password } = data;
  if (
    !email
      ?.toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
  ) {
    return {
      type: 'email',
      message: 'Не верно указана почта',
    };
  }
  if (login === '' || login === undefined) {
    return {
      type: 'login',
      message: 'Не верно указана почта',
    };
  }
  if (password && password?.length < 8) {
    return {
      type: 'password',
      message: 'Пароль меньше 8 символов',
    };
  }
  if (re_password && re_password?.length < 8) {
    return {
      type: 're_password',
      message: 'Пароль меньше 8 символов',
    };
  }
  if (password !== re_password) {
    return {
      type: 're_password',
      message: 'Пароли не совпадают',
    };
  }
  return true;
};

export const AuthSignUp = (props: Omit<AuthProps, 'visible'>) => {
  const { setVisibleModal } = props;

  const [data, setData] = useState<AuthData<'signup'>>({});
  const [error, setError] = useState<Error | undefined>();

  const { postRegister } = useRequests();

  const handleChange = (event: TextFieldOnChangeArguments) => {
    const { value, name } = event;
    name && setData({ ...data, [name]: value });
  };

  const { refs, onKeyPress } = useFocus(5);

  const dispatch = useDispatch();

  const validate = (): boolean => {
    const res = isValidData(data);
    if (typeof res === 'boolean') {
      return true;
    }
    setError(res);
    return false;
  };

  const handleClick = async () => {
    setError(undefined);
    if (validate()) {
      const { error, data: result } = await postRegister({
        email: data.email,
        password: data.password,
      });
      if (!error.error && result) {
        dispatch(setUser(data));
        setVisibleModal?.(false);
        console.log(result);
      } else {
        setError({
          type: 'email',
          message: String(error.message),
        });
      }
    }
  };

  return (
    <div className={cnAuthSignUp()}>
      <TextField
        id="email"
        label="Email"
        placeholder="Email"
        width="full"
        name="email"
        type="email"
        autoFocus
        ref={refs[0]}
        onKeyPress={(e) => onKeyPress(e, 0)}
        caption={error?.type === 'email' ? error.message : undefined}
        status={error?.type === 'email' ? 'alert' : undefined}
        value={data.email}
        className={cnAuthSignUp('Input')}
        onChange={handleChange}
      />
      <TextField
        id="login"
        label="Логин"
        placeholder="Логин"
        width="full"
        name="login"
        type="text"
        caption={error?.type === 'login' ? error.message : undefined}
        status={error?.type === 'login' ? 'alert' : undefined}
        value={data.login}
        ref={refs[1]}
        onKeyPress={(e) => onKeyPress(e, 1)}
        className={cnAuthSignUp('Input')}
        onChange={handleChange}
      />
      <TextField
        id="password"
        name="password"
        placeholder="Пароль"
        width="full"
        type="password"
        caption={error?.type === 'password' ? error.message : undefined}
        status={error?.type === 'password' ? 'alert' : undefined}
        label="Пароль"
        ref={refs[2]}
        onKeyPress={(e) => onKeyPress(e, 2)}
        value={data.password}
        className={cnAuthSignUp('Input')}
        onChange={handleChange}
      />
      <TextField
        id="re_password"
        name="re_password"
        placeholder="Проверка пароля"
        width="full"
        type="password"
        caption={error?.type === 're_password' ? error.message : undefined}
        status={error?.type === 're_password' ? 'alert' : undefined}
        label="Проверка пароля"
        value={data.re_password}
        ref={refs[3]}
        onKeyPress={(e) => onKeyPress(e, 3)}
        className={cnAuthSignUp('Input')}
        onChange={handleChange}
      />
      <Button
        width="full"
        className={cnAuthSignUp('Button')}
        label="Войти"
        ref={refs[4] as React.RefObject<HTMLButtonElement>}
        onClick={handleClick}
      />
    </div>
  );
};
