import { ComponentType } from 'react';
import { atom } from 'recoil';

interface ModalType {
    key: string;
    Component: ComponentType<any>;
    props: any;
    resolve: (value: any) => void;
    cancel: () => void;
}

export const modalState = atom<ModalType[]>({
    key: 'modalState',
    default: [],
    dangerouslyAllowMutability: true,
});

export type { ModalType };
