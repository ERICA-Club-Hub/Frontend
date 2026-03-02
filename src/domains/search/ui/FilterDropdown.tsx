import { useEffect } from 'react';
import ArrowIcon from '@/assets/common/expand-bottom.svg?react';
import { cva } from 'class-variance-authority';
import { cn } from '@/utils/cn';
import createDropdown from '@/components/Dropdown/Dropdown';
import { useDropdown } from '@/components/Dropdown/dropdown.context';

interface Option {
    value: string;
    label: string;
}
const Dropdown = createDropdown<Option>();

const triggerVariants = cva(
    'flex justify-center items-center gap-[2px] w-full min-h-[24px] py-[4px] pr-[6px] pl-[12px] rounded-[12px] text-c1',
    {
        variants: {
            state: {
                default: 'bg-neutral-00 text-text-main',
                selected:
                    'border border-solid border-brand bg-primary-50 text-text-main',
                disabled: 'bg-neutral-100 text-neutral-600',
            },
        },
        defaultVariants: {
            state: 'default',
        },
    },
);

interface FilterDropdownProps {
    title?: string;
    options?: Option[];
    selectedValue?: string | null;
    onSelect: (value: string) => void;
    disabled?: boolean;
}

export default function FilterDropdown({
    title,
    options = [],
    selectedValue,
    onSelect,
    disabled = false,
}: FilterDropdownProps) {
    const triggerState = disabled
        ? 'disabled'
        : selectedValue
          ? 'selected'
          : 'default';

    return (
        <Dropdown.Container
            itemOptions={options}
            className={cn('w-max', disabled && 'pointer-events-none')}
        >
            <SyncSelection options={options} selectedValue={selectedValue} />

            <Dropdown.Trigger className={triggerVariants({ state: triggerState })}>
                <Dropdown.Value>
                    {({ selectedItem }) => (
                        <span>{selectedItem ? selectedItem.label : title}</span>
                    )}
                </Dropdown.Value>
                <ArrowIcon />
            </Dropdown.Trigger>
            <Dropdown.List
                className={cn(
                    'top-[28px] left-0 flex flex-col gap-1 min-w-full w-max py-[8px] px-[10px] rounded-[12px]',
                    'divide-y divide-neutral-100 bg-neutral-00 shadow-dropdown',
                )}
            >
                {options.map((option, idx) => (
                    <Dropdown.Item
                        key={option.value}
                        index={idx}
                        onClick={() => onSelect(option.value)}
                        className={cn('flex justify-center pb-[4px] last:pb-0')}
                    >
                        {({ isSelected }) => (
                            <button
                                className={cn(
                                    'flex justify-center items-center w-full h-full min-h-[28px]',
                                    isSelected &&
                                        'bg-neutral-100 rounded-[8px]',
                                )}
                            >
                                <span
                                    className={cn(
                                        isSelected ? 'text-c3' : 'text-c2',
                                    )}
                                >
                                    {option.label}
                                </span>
                            </button>
                        )}
                    </Dropdown.Item>
                ))}
            </Dropdown.List>
        </Dropdown.Container>
    );
}

/**
 * 외부 상태(URL param)와 내부 상태(Dropdown index)를 동기화하는 컴포넌트
 */
function SyncSelection({
    options,
    selectedValue,
}: {
    options: Option[];
    selectedValue?: string | null;
}) {
    const { setSelectedIndex } = useDropdown();

    useEffect(() => {
        if (!selectedValue) {
            setSelectedIndex(-1);
            return;
        }
        const index = options.findIndex((opt) => opt.value === selectedValue);
        setSelectedIndex(index);
    }, [selectedValue, options, setSelectedIndex]);

    return null;
}
