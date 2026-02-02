import { createContext, useContext } from 'react';
import type {
    DropdownContextValue,
    DropdownDispatchContextValue,
} from './dropdown.types';

export const DropdownContext = createContext<DropdownContextValue<any> | null>(
    null,
);

export const DropdownDispatchContext =
    createContext<DropdownDispatchContextValue<any> | null>(null);

export const useDropdown = <T>(): DropdownContextValue<T> => {
    const context = useContext(DropdownContext);

    if (!context) {
        throw new Error('useDropdown must be used within a DropdownProvider');
    }

    return context as DropdownContextValue<T>;
};
export const useSetDropdown = <T>(): DropdownDispatchContextValue<T> => {
    const context = useContext(DropdownDispatchContext);

    if (!context) {
        throw new Error(
            'useSetDropdown must be used within a DropdownProvider',
        );
    }
    return context as DropdownDispatchContextValue<T>;
};
