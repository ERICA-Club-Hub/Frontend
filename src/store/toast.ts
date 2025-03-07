import { atom } from 'recoil';

// 토스트 상태
export const toastState = atom({
    key: 'toastState',
    default: {
        on: false,
        message: '',
    },
});
