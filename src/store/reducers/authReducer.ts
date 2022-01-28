import { Reducer } from 'redux';
import { StoreActionType } from '.';

type State = {
  showAuthWindow: boolean;
  isAuthorized: boolean;
};

const initialState: State = {
  showAuthWindow: false,
  isAuthorized: false,
};

export const SET_IS_AUTHORIZED = 'SET_IS_AUTHORIZED';
export const SET_SHOW_AUTH = 'SET_SHOW_AUTH';

const actionTypes = [SET_IS_AUTHORIZED, SET_SHOW_AUTH] as const;
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
