import { cn } from '@/utils/cn';
import { useState, useRef, useEffect } from 'react';
import ArrowIcon from '../../assets/common/sortingdropdown_arrow.svg';

interface SortingOption {
    label: string;
    value: string;
}

interface SortingDropdownProps {
    options: SortingOption[];
    onSelect?: (value: string) => void;
    defaultText: string;
    value?: string;
    align?: 'left' | 'right';
}

const SortingDropdown = ({
    options,
    onSelect,
    defaultText,
    value,
    align = 'left',
}: SortingDropdownProps) => {
    const [selectedValue, setSelectedValue] = useState<string | null>(
        value || null
    );
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setSelectedValue(value || null);
    }, [value]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleSelect = (value: string) => {
        setSelectedValue(value);
        onSelect?.(value);
        setIsOpen(false);
    };

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const isFirstOptionSelected =
        selectedValue === options[0]?.value || selectedValue === null;
    const backgroundClass = isFirstOptionSelected
        ? 'bg-white'
        : 'bg-badge-blue-bg';

    return (
        <div
            ref={dropdownRef}
            className={cn(
                'inline-flex px-[11px] py-[5px]',
                'items-center gap-[6px]',
                'rounded-full',
                backgroundClass,
                'relative cursor-pointer'
            )}
        >
            <ul
                onClick={toggleDropdown}
                className="list-none p-0 m-0 flex items-center gap-[6px]"
            >
                {selectedValue === null ? (
                    <li className="text-caption font-normal leading-normal cursor-pointer">
                        {defaultText}
                    </li>
                ) : (
                    <li className="text-caption font-semibold leading-normal cursor-pointer">
                        {
                            options.find(
                                (option) => option.value === selectedValue
                            )?.label
                        }
                    </li>
                )}
                <img
                    src={ArrowIcon}
                    alt="arrow"
                    className={cn(
                        'w-[8px] h-[5px]',
                        'transition-transform duration-200 ease-in-out',
                        isOpen ? 'rotate-180' : 'rotate-0'
                    )}
                />
            </ul>

            <ul
                className={cn(
                    'absolute top-full mt-[5px]',
                    align === 'right' ? 'right-0' : 'left-0',
                    'min-w-full',
                    'list-none p-[5px] m-0',
                    'bg-white rounded-[10px]',
                    'shadow-[0px_2px_2px_0px_rgba(0,0,0,0.10)]',
                    'z-[1000] whitespace-nowrap',
                    isOpen ? 'block' : 'hidden'
                )}
            >
                {options.map((option) => (
                    <li
                        key={option.value}
                        onClick={() => handleSelect(option.value)}
                        className={cn(
                            'text-[#232323] text-center text-caption font-medium leading-normal',
                            'px-[11px] py-[8px] rounded-[5px]',
                            'hover:font-semibold hover:bg-[#F7F7F7]'
                        )}
                    >
                        {option.label}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SortingDropdown;
