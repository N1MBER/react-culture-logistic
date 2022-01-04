import { Reducer } from 'redux';
import { ModalData, StoreActionType } from '../../types/setings';

type State = {
  modalStack: ModalData[];
};

const initialState: State = {
  modalStack: [],
};

export const REMOVE_MODAL_DATA = 'REMOVE_MODAL_DATA';
export const CLEAR_MODAL_STACK = 'CLEAR_MODAL_STACK';
export const PUSH_MODAL_DATA = 'PUSH_MODAL_DATA';

const actionTypes = [
  REMOVE_MODAL_DATA,
  CLEAR_MODAL_STACK,
  PUSH_MODAL_DATA,
] as const;
type ActionType = typeof actionTypes[number];

export const settingsReducer: Reducer<State, StoreActionType<ActionType>> = (
  state = initialState,
  action: StoreActionType<ActionType>
) => {
  const { data, type } = action;
  switch (type) {
    case 'CLEAR_MODAL_STACK':
      return { ...state, modalStack: [] };
    case 'PUSH_MODAL_DATA':
      return { ...state, modalStack: [...state.modalStack, data as ModalData] };
    case 'REMOVE_MODAL_DATA': {
      const copyArray = [...state.modalStack];
      const index = copyArray.indexOf(
        copyArray.filter((modal) => modal.key === data)[0]
      );
      copyArray.splice(index, 1);
      return { ...state, modalStack: copyArray };
    }
    default:
      return state;
  }
};

export const removeModalData = (key: string | number) => {
  return {
    type: REMOVE_MODAL_DATA,
    data: key,
  };
};

export const pushModalData = (data: ModalData) => {
  return {
    type: PUSH_MODAL_DATA,
    data,
  };
};

export const clearModalStack = () => {
  return {
    type: CLEAR_MODAL_STACK,
  };
};
