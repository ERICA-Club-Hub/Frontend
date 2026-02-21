import createDropdown from '@/components/Dropdown/Dropdown';
import ArrowIcon from '@/assets/common/dropdown_arrow.svg?react';
import {
    MonthLabel,
    months,
    MonthValue,
} from '@/domains/club/schedule/constants/schedule.constant';
import { cn } from '@/utils/cn';
import { useDropdown } from '@/components/Dropdown/dropdown.context';
import { useEffect } from 'react';

export type MonthItemType = {
    label: MonthLabel;
    value: MonthValue;
};

const Dropdown = createDropdown<MonthItemType>();

export default function MonthSelect({
    handleMonthValue,
    selectedValue,
}: {
    handleMonthValue: (month: MonthValue) => void;
    selectedValue: MonthValue | null;
}) {
    const hasSelectedValue = !!selectedValue;

    return (
        <Dropdown.Container itemOptions={months} className={cn('w-max')}>
            <SyncSelection options={months} selectedValue={selectedValue} />

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
                        <span className={cn('min-w-[26px] text-b4')}>
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

/**
 * 외부 상태(api data)와 내부 상태(Dropdown index)를 동기화하는 컴포넌트
 */
function SyncSelection({
    options,
    selectedValue,
}: {
    options: readonly MonthItemType[];
    selectedValue?: MonthValue | null;
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
