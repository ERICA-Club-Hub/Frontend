import createDropdown from '@/components/Dropdown/Dropdown';
import ArrowIcon from '@/assets/common/dropdown_arrow.svg?react';
import { months } from '@/domains/shared/constants/club-detail-register.constant';
import { cn } from '@/utils/cn';

export type MonthItemType = {
    label: string;
    value: number;
};

const Dropdown = createDropdown<MonthItemType>();

export default function MonthSelect({
    handleMonthValue,
    selectedValue,
}: {
    handleMonthValue: (month: number) => void;
    selectedValue: number | null;
}) {
    const hasSelectedValue = !!selectedValue;

    return (
        <Dropdown.Container itemOptions={months} className={cn('w-max')}>
            {/* TODO: 두자리 수 월 처리 (디자인 가이드 반영 후) */}
            <Dropdown.Trigger
                className={cn(
                    'flex justify-center items-center gap-[2px] w-[60px] h-[46px] py-[12.5px] pr-[6px] pr-[7px] pl-[11px] rounded-[8px] text-c1 text-text-main bg-white',
                    hasSelectedValue
                        ? 'bg-neutral-00 border border-solid border-neutral-150'
                        : 'border-transparent bg-neutral-100',
                )}
            >
                <Dropdown.Value>
                    {({ selectedItem }) => (
                        <span className={cn('w-[24px] text-b4')}>
                            {selectedItem ? selectedItem.label : '월'}
                        </span>
                    )}
                </Dropdown.Value>
                <ArrowIcon />
            </Dropdown.Trigger>
            <Dropdown.List
                className={cn(
                    'top-[52px] left-0 flex flex-col gap-1 min-w-full w-max h-[153px] py-2 px-[10px] rounded-[12px] divide-y divide-neutral-100 bg-neutral-00 shadow-dropdown',
                )}
            >
                {months.map((month, idx) => (
                    <Dropdown.Item
                        key={month.value}
                        index={idx}
                        onClick={() => handleMonthValue(month.value)}
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
                                    {month.label}
                                </span>
                            </button>
                        )}
                    </Dropdown.Item>
                ))}
            </Dropdown.List>
        </Dropdown.Container>
    );
}
