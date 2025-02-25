import { ReactNode } from 'react';

interface IModal {
    children: ReactNode;
    isOpen: boolean;
    toggle: () => void;
}

export type { IModal };
