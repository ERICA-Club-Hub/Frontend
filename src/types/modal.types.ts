import { ReactNode } from 'react';

interface IModal {
    children?: ReactNode;
    isOpen: boolean;
    toggle: () => void;
}

interface IActionModal {
    isOpen: boolean;
    toggle: () => void;
    action: () => void;
}

export type { IModal, IActionModal };
