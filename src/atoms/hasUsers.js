import { atom } from 'recoil';

export const hasUsers = atom({
  key: 'gitHasUserState',
  default: false,
});
