import React, { ComponentProps } from 'react';

export type DropdownContextValue<T> = {
    items: T[];
    selectedIndex: number;
    isOpen: boolean;
};
export type DropdownDispatchContextValue<T> = {
    setItems: React.Dispatch<React.SetStateAction<T[]>>;
    setSelectedIndex: React.Dispatch<React.SetStateAction<number>>;
    toggle: (force?: boolean) => void;
};

export type Headless<T> = {
    children: (props: T) => React.ReactNode;
};

export type DropdownValueProps<T> = {
    selectedItem: T | null;
};
export type DropdownItemChildren =
    | React.ReactNode
    | ((props: { isSelected: boolean }) => React.ReactNode);

export type DropdownItemProps = {
    index: number;
    children?: DropdownItemChildren;
} & Omit<ComponentProps<'li'>, 'children'>;
