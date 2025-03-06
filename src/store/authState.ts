import { getAccessToken } from '@/utils/tokenHandler';
import { atom, selector } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist({
    key: 'authState',
    storage: localStorage,
});

// 로그인 여부를 확인하는 상태
const isAuthenticated = atom({
    key: 'isAuthenticated',
    default: !!getAccessToken(), // localStroage에서 초기값 가져오기
    effects_UNSTABLE: [persistAtom],
});

// 어드민 유형을 확인하는 상태 (club, union, service)
const adminType = atom<string | null>({
    key: 'adminType',
    default: null, // 초기값은 null
    effects_UNSTABLE: [persistAtom],
});

// 로그인 여부를 확인하는 selector
const isAuthenticatedSelector = selector({
    key: 'isAuthenticatedSelector',
    get: ({ get }) => get(isAuthenticated), // isAuthenticated의 현재 상태 값을 가져옴
});

// 어드민 유형을 확인하는 selector
const adminTypeSelector = selector({
    key: 'adminTypeSelector',
    get: ({ get }) => get(adminType), // adminType의 현재 상태 값을 가져옴
});

export {
    isAuthenticated,
    adminType,
    isAuthenticatedSelector,
    adminTypeSelector,
};
