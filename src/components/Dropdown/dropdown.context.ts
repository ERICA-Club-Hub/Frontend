import { createContext, useContext } from 'react';
import type { DropdownContextValue } from './dropdown.types';

export const DropdownContext = createContext<DropdownContextValue<any> | null>(
    null,
);

export const useDropdown = <T>(): DropdownContextValue<T> => {
    const context = useContext(DropdownContext);

    if (!context) {
        throw new Error('useDropdown must be used within a DropdownProvider');
    }

    return context as DropdownContextValue<T>;
};
