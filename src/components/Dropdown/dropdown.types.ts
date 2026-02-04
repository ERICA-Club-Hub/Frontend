import { ComponentProps, Dispatch, ReactNode, SetStateAction } from 'react';

export type DropdownContextValue<T> = {
    items: T[];
    selectedIndex: number;
    isOpen: boolean;
    setItems: Dispatch<SetStateAction<T[]>>;
    setSelectedIndex: Dispatch<SetStateAction<number>>;
    toggle: (force?: boolean) => void;
};

type RenderProp<T = void> = ReactNode | ((props: T) => ReactNode);

type DropdownTriggerState = { isOpen: boolean };
type DropdownValueState<T> = { selectedItem: T | null };
type DropdownItemState = { isSelected: boolean };

export type DropdownTriggerProps = {
    children: RenderProp<DropdownTriggerState>;
} & Omit<ComponentProps<'button'>, 'children'>;

export type DropdownValueProps<T> = {
    children: RenderProp<DropdownValueState<T>>;
};

export type DropdownItemProps = {
    index: number;
    children: RenderProp<DropdownItemState>;
    delay?: number;
} & Omit<ComponentProps<'li'>, 'children'>;
