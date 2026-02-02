import { ComponentProps, useEffect, useRef, useState } from 'react';
import type {
    DropdownItemProps,
    DropdownValueProps,
    Headless,
} from './dropdown.types';
import {
    DropdownContext,
    DropdownDispatchContext,
    useDropdown,
    useSetDropdown,
} from './dropdown.context';
import { cn } from '@/utils/cn';

const createDropdown = <T,>() => {
    /**
     * Context Provider & 컨테이너 역할 담당
     * @param itemOptions - 드롭다운 아이템 리스트
     * @param children - 자식 컴포넌트
     */
    function DropdownContainer({
        itemOptions,
        children,
        className,
        ...props
    }: {
        itemOptions: T[];
        children: React.ReactNode;
        className?: string;
    } & ComponentProps<'div'>) {
        const [items, setItems] = useState<T[]>(itemOptions);
        const [isOpen, setIsOpen] = useState<boolean>(false);
        const [selectedIndex, setSelectedIndex] = useState<number>(-1);

        const containerRef = useRef<HTMLDivElement>(null);

        const toggle = (force?: boolean) => {
            setIsOpen((prev) => (typeof force === 'boolean' ? force : !prev));
        };

        useEffect(() => {
            const handleClickOutside = (event: MouseEvent) => {
                // 열려있고, 클릭된 타겟이 컨테이너 내부에 포함되지 않을 때만 닫기
                if (
                    isOpen &&
                    containerRef.current &&
                    !containerRef.current.contains(event.target as Node)
                ) {
                    toggle(false);
                }
            };

            if (isOpen) {
                window.addEventListener('mousedown', handleClickOutside);
            }
            return () => {
                window.removeEventListener('mousedown', handleClickOutside);
            };
        }, [isOpen]);

        return (
            <DropdownContext.Provider
                value={{
                    items,
                    isOpen,
                    selectedIndex,
                }}
            >
                <DropdownDispatchContext.Provider
                    value={{
                        setItems,
                        setSelectedIndex,
                        toggle,
                    }}
                >
                    <div
                        ref={containerRef}
                        className={cn('relative inline-block', className)}
                        {...props}
                    >
                        {children}
                    </div>
                </DropdownDispatchContext.Provider>
            </DropdownContext.Provider>
        );
    }

    function DropdownTrigger({
        children,
        onClick,
        ...props
    }: ComponentProps<'button'>) {
        const { toggle } = useSetDropdown();

        const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
            toggle();
            onClick?.(e);
        };

        return (
            <button onClick={handleClick} {...props}>
                {children}
            </button>
        );
    }

    /**
     * 드롭다운 선택된 값 표시 컴포넌트
     * @param children - UI를 렌더링하는 함수. 인자로 선택된 아이템(selectedItem)을 담은 객체를 받음
     * @returns - `({ selectedItem }) => JSX.Element` 형태여야 하며, `selectedItem`을 통해 현재 선택된 아이템에 접근 가능
     */
    function DropdownValue({ children }: Headless<DropdownValueProps<T>>) {
        const { items, selectedIndex } = useDropdown<T>();
        const selectedItem = items[selectedIndex];

        return (
            <>
                {children({
                    selectedItem,
                })}
            </>
        );
    }

    function DropdownList({
        children,
        className,
        ...props
    }: ComponentProps<'ul'>) {
        const { isOpen } = useDropdown<T>();

        if (!isOpen) return null;

        return (
            <ul className={cn('absolute z-10', className)} {...props}>
                {children}
            </ul>
        );
    }

    function DropdownItem({
        index,
        children,
        className,
        onClick,
        ...props
    }: DropdownItemProps) {
        const { selectedIndex } = useDropdown<T>();
        const { setSelectedIndex, toggle } = useSetDropdown<T>();

        const isSelected = selectedIndex === index;

        const handleClick = (e: React.MouseEvent<HTMLLIElement>) => {
            e.stopPropagation();
            setSelectedIndex(index);
            toggle(false);
            onClick?.(e);
        };

        return (
            <li
                onClick={handleClick}
                className={cn('cursor-pointer', className)}
                {...props}
            >
                {typeof children === 'function'
                    ? children({ isSelected })
                    : children}
            </li>
        );
    }

    const Dropdown = {
        Container: DropdownContainer,
        Trigger: DropdownTrigger,
        Value: DropdownValue,
        List: DropdownList,
        Item: DropdownItem,
    };

    return Dropdown;
};

export default createDropdown;
