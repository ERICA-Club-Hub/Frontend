import { ReactNode } from 'react';

interface IModal {
    children?: ReactNode;
    isOpen: boolean;
    toggle: () => void;
    isLoadingModal?: boolean;
}

interface IActionModal {
    isOpen: boolean;
    toggle: () => void;
    action: () => void;
}

interface ILoadingModal {
    isPending: boolean;
    isSuccess: boolean;
}

export type { IModal, IActionModal, ILoadingModal };
