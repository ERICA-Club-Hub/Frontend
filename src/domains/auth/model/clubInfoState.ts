import { atom, selector } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist({
    key: 'clubInfoState',
    storage: localStorage,
});

const clubId = atom<number | null>({
    key: 'clubId',
    default: null,
    effects_UNSTABLE: [persistAtom],
});

const clubName = atom<string | null>({
    key: 'clubName',
    default: null,
    effects_UNSTABLE: [persistAtom],
});

const clubIdSelector = selector({
    key: 'clubIdSelector',
    get: ({ get }) => get(clubId),
});

const clubNameSelector = selector({
    key: 'clubNameSelector',
    get: ({ get }) => get(clubName),
});

export { clubId, clubIdSelector, clubName, clubNameSelector };
