import { atom } from 'recoil';

export const navState = atom<number | null>({
    key: 'navState',
    default: 1,
});
