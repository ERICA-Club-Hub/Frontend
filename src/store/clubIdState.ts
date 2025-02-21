import { atom, selector } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist({
    key: 'clubIdState',
    storage: localStorage,
});

const clubId = atom<number | null>({
    key: 'clubId',
    default: null,
    effects_UNSTABLE: [persistAtom],
});

const clubIdselector = selector({
    key: 'clubIdselector',
    get: ({ get }) => get(clubId),
});

export { clubId, clubIdselector };
