import { TextField, TextFieldOnChangeArguments } from '@consta/uikit/TextField';
import { Button } from '@consta/uikit/Button';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { cn } from '../../../__private__/utils/bem';
import { AuthData, AuthProps } from '../types';
import { setUser } from '../../../store/reducers/authReducer';

import './AuthSignIn.scss';
import { useRequests } from '../../../hooks/useRequests/useRequests';
import { useFocus } from '../../../hooks/useFocus/useFocus';

const cnAuthSignIn = cn('AuthSignIn');

export const AuthSignIn = (props: Omit<AuthProps, 'visible'>) => {
  const { setVisibleModal } = props;

  const [data, setData] = useState<AuthData<'signin'>>({});
  const [error, setError] = useState<string | undefined>();

  const { postToken } = useRequests();

  const handleChange = (event: TextFieldOnChangeArguments) => {
    const { value, name } = event;
    name && value && setData({ ...data, [name]: value });
  };

  const dispatch = useDispatch();

  const { refs, onKeyPress } = useFocus(3);

  const handleClick = async () => {
    setError(undefined);
    const { error, data: result } = await postToken(data);
    if (!error.error && result) {
      dispatch(setUser(data));
      setVisibleModal?.(false);
      console.log(result);
    } else {
      setError(String(error.message));
    }
  };

  return (
    <div className={cnAuthSignIn()}>
      <TextField
        id="email"
        label="Email"
        placeholder="Email"
        width="full"
        name="email"
        type="email"
        autoFocus
        ref={refs[0]}
        caption={error ?? undefined}
        status={error ? 'alert' : undefined}
        value={data.email}
        onKeyPress={(e) => onKeyPress(e, 0)}
        className={cnAuthSignIn('Input')}
        onChange={handleChange}
      />
      <TextField
        id="password"
        name="password"
        placeholder="Пароль"
        width="full"
        label="Пароль"
        ref={refs[1]}
        type="password"
        value={data.password}
        onKeyPress={(e) => onKeyPress(e, 1)}
        className={cnAuthSignIn('Input')}
        onChange={handleChange}
      />
      <Button
        width="full"
        className={cnAuthSignIn('Button')}
        label="Войти"
        type="submit"
        ref={refs[2] as React.RefObject<HTMLButtonElement>}
        onClick={handleClick}
      />
    </div>
  );
};
