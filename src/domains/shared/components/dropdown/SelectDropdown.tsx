import ArrowIcon from '@/assets/common/expand-arrow.svg?react';
import { cn } from '@/utils/cn';
import createDropdown from '@/components/Dropdown/Dropdown';
import Button from '@/components/Button/Button';

interface DropdownItemType {
    label: string;
    value: string;
}
const Dropdown = createDropdown<DropdownItemType>();

interface SelectDropdownProps {
    items: DropdownItemType[];
    id: string;
    value: string;
    onChange: (value: string) => void;
    placeholder: string;
}

// TODO: 이미 선택한 카테고리가 있을 때 받아와서 표시해주는 기능도 추가 필요
export default function SelectDropdown({
    items,
    id,
    value,
    onChange,
    placeholder,
}: SelectDropdownProps) {
    const hasSelectedValue = !!value;

    const renderSelectedItem = () => {
        const selectedItem = items.find((item) => item.value === value);
        return selectedItem ? selectedItem.label : placeholder;
    };

    return (
        <Dropdown.Container itemOptions={items}>
            <Dropdown.Trigger
                id={id}
                className={cn(
                    'flex justify-start items-center w-[320px] h-[46px] p-[12px] border border-solid rounded-[8px]',
                    'transition-all duration-300 ease-in-out',
                    hasSelectedValue
                        ? 'border-neutral-150 bg-neutral-00'
                        : 'border-transparent bg-neutral-100 focus:bg-neutral-00',
                )}
            >
                {({ isOpen }) => (
                    <>
                        <Dropdown.Value>
                            <span
                                className={cn(
                                    'flex-1 text-b4 text-left',
                                    hasSelectedValue
                                        ? 'text-neutral-900'
                                        : 'text-neutral-400',
                                )}
                            >
                                {renderSelectedItem()}
                            </span>
                        </Dropdown.Value>

                        <div
                            className={cn(
                                'flex justify-center items-center transition-transform duration-300 ease-in-out',
                                isOpen ? 'rotate-90' : 'rotate-0',
                            )}
                        >
                            <ArrowIcon
                                stroke={
                                    hasSelectedValue ? '#1C232C' : '#8FA3B7'
                                }
                            />
                        </div>
                    </>
                )}
            </Dropdown.Trigger>
            <Dropdown.List
                className={cn(
                    'top-[50px] left-0 flex justify-center items-center flex-wrap gap-x-[8px] gap-y-[10px] min-w-full p-[12px] px-[8px] rounded-[8px] bg-neutral-00',
                )}
            >
                {items.map((item, idx) => (
                    <Dropdown.Item
                        key={item.value}
                        index={idx}
                        onClick={() => onChange(item.value)}
                        className={cn('flex flex-1 basis-[45%] min-w-fit')}
                        delay={300}
                    >
                        {({ isSelected }) => (
                            <Button
                                size="sm"
                                variant="neutral"
                                className={cn(
                                    'flex justify-center items-center w-full min-h-[28px] whitespace-nowrap',
                                    isSelected &&
                                        'bg-brand hover:bg-brand rounded-[8px]',
                                )}
                            >
                                <span
                                    className={cn(
                                        'text-b3',
                                        isSelected
                                            ? 'text-neutral-50'
                                            : 'text-neutral-600',
                                    )}
                                >
                                    {item.label}
                                </span>
                            </Button>
                        )}
                    </Dropdown.Item>
                ))}
            </Dropdown.List>
        </Dropdown.Container>
    );
}
