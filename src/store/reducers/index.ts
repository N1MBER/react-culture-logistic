import { combineReducers } from 'redux';
// @ts-ignore
import { CookieStorage } from 'redux-persist-cookie-storage';
import Cookies from 'cookies-js';
import { persistReducer } from 'redux-persist';
import { settingsReducer } from './settingsReducer';
import { accessReducer } from './tokenStorage/accessStore';
import { refreshReducer } from './tokenStorage/refreshStore';

type PersistParam = {
  key: string;
  lifetime?: number;
  whitelist?: string[];
};

const getPersistConfig = (params: PersistParam) => ({
  key: params.key,
  storage: new CookieStorage(Cookies, {
    expiration: {
      default: params.lifetime || 31449600, // Cookies expire after one year
    },
  }),
  whitelist: params.whitelist,
});

export const rootReducer = combineReducers({
  access: persistReducer(
    getPersistConfig({
      key: 'access',
      whitelist: ['access'],
      lifetime: 604800,
    }),
    accessReducer
  ),
  refresh: persistReducer(
    getPersistConfig({ key: 'refresh', whitelist: ['refresh'] }),
    refreshReducer
  ),
  settings: settingsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
