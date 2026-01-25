import { useState } from 'react';
import ArrowIcon from '@/assets/common/expand-bottom.svg?react';
import { cn } from '@/utils/cn';
import { Dropdown } from '@/components/Common';

interface Option {
    value: string;
    label: string;
}

interface ClubListDropdownProps {
    title?: string;
    options?: Option[];
    selectedValue?: string | null;
    onSelect: (value: string) => void;
}

export default function ClubListDropdown({
    title,
    options,
    selectedValue,
    onSelect,
}: ClubListDropdownProps) {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const handleSelectItem = (option: Option) => {
        onSelect(option.value);
        setIsOpen(false);
    };

    const selectedOption = options?.find(
        (option) => option.value === selectedValue,
    );
    const displayText = selectedOption ? selectedOption.label : title;

    const hasSelectedValue = !!selectedValue;

    return (
        <Dropdown setIsOpen={setIsOpen}>
            <Dropdown.Header onClick={() => setIsOpen((prev) => !prev)}>
                <div
                    className={cn(
                        'h-6 py-[5px] px-[11px] flex gap-1.5 rounded-full justify-center items-center w-max',
                        hasSelectedValue
                            ? 'bg-[rgba(238,244,255,1)]'
                            : 'bg-white',
                    )}
                >
                    <p className="text-caption font-normal text-black">
                        {displayText}
                    </p>
                    <ArrowIcon />
                </div>
            </Dropdown.Header>
            <Dropdown.Menu isOpen={isOpen}>
                <div className="rounded-[10px] top-[5px] bg-white flex flex-col p-[5px] gap-[5px] justify-center items-center w-max absolute">
                    {options &&
                        options.map((option) => (
                            <button
                                key={option.value}
                                className={cn(
                                    'w-full py-2 px-6 rounded-[5px]',
                                    selectedValue === option.value
                                        ? 'bg-[#F7F7F7] font-semibold'
                                        : 'bg-white font-medium',
                                )}
                                onClick={() => handleSelectItem(option)}
                            >
                                <p className="text-caption">{option.label}</p>
                            </button>
                        ))}
                </div>
            </Dropdown.Menu>
        </Dropdown>
    );
}
