import { Reducer } from 'redux';
import { StoreActionType } from '.';
import { UserType as User } from '../../types/api';

type UserType = 'person' | 'admin';

type State = {
  showAuthWindow: boolean;
  isAuthorized: boolean;
  userType?: UserType;
  user?: User;
};

const initialState: State = {
  showAuthWindow: false,
  isAuthorized: false,
  userType: 'person',
  user: undefined,
};

export const SET_IS_AUTHORIZED = 'SET_IS_AUTHORIZED';
export const SET_SHOW_AUTH = 'SET_SHOW_AUTH';
export const SET_USER_TYPE = 'SET_USER_TYPE';
export const SET_USER = 'SET_USER';
export const LOGOUT = 'LOGOUT';

const actionTypes = [
  SET_IS_AUTHORIZED,
  SET_SHOW_AUTH,
  SET_USER_TYPE,
  LOGOUT,
  SET_USER,
] as const;
type ActionTypes = typeof actionTypes[number];

export const authReducer: Reducer<State, StoreActionType<ActionTypes>> = (
  state = initialState,
  action: StoreActionType<ActionTypes>
) => {
  const { data, type } = action;
  switch (type) {
    case SET_IS_AUTHORIZED:
      return { ...state, isAuthorized: !!data };
    case SET_SHOW_AUTH:
      return { ...state, showAuthWindow: !!data };
    case SET_USER_TYPE:
      return { ...state, userType: data as UserType };
    case SET_USER:
      return { ...state, user: data as User, isAuthorized: true };
    case LOGOUT:
      return { ...state, user: undefined, isAuthorized: false };
    default:
      return state;
  }
};

export const setIsAuthorized = (flag: boolean) => {
  return {
    type: SET_IS_AUTHORIZED,
    data: flag,
  };
};

export const setShowAuth = (flag: boolean) => {
  return {
    type: SET_SHOW_AUTH,
    data: flag,
  };
};

export const setUserType = (data: UserType) => {
  return {
    type: SET_USER_TYPE,
    data,
  };
};

export const setUser = (data: User) => {
  return {
    type: SET_USER,
    data,
  };
};

export const logout = () => {
  return {
    type: LOGOUT,
  };
};
