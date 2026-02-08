import ArrowIcon from '@/assets/common/expand-bottom.svg?react';
import { cn } from '@/utils/cn';
import createDropdown from '@/components/Dropdown/Dropdown';
import { RecruitmentStatus } from '@/types/recruitment-status.type';
import { RecruitmentStatusConfig } from '@/types/configs.types';
import { RECRUITMENT_STATUS } from '@/constants/category-config.constant';
import { useDropdown } from '@/components/Dropdown/dropdown.context';
import { useEffect } from 'react';

interface Options {
    value: RecruitmentStatus;
    label: RecruitmentStatusConfig['label'];
}
const Dropdown = createDropdown<Options>();

interface RecruitStatusDropdownProps {
    options?: Options[];
    selectedValue?: RecruitmentStatus;
    onSelect: (value: RecruitmentStatus) => void;
}

export default function RecruitmentStatusDropdown({
    options = [],
    selectedValue,
    onSelect,
}: RecruitStatusDropdownProps) {
    const hasSelectedValue = !!selectedValue;

    const renderTitle = () => {
        if (!selectedValue) return '모집 상태';

        const selectedStatus =
            RECRUITMENT_STATUS[selectedValue as RecruitmentStatus].label;

        return selectedStatus;
    };

    return (
        <Dropdown.Container itemOptions={options} className={cn('w-max')}>
            <SyncSelection options={options} selectedValue={selectedValue} />

            <Dropdown.Trigger
                className={cn(
                    'flex justify-center items-center gap-[2px] w-full h-[24px] py-[4px] pr-[6px] pl-[12px] rounded-[12px] text-c1 text-text-main bg-white',
                    hasSelectedValue
                        ? 'border border-solid border-brand bg-primary-50'
                        : 'bg-neutral-00',
                )}
            >
                <Dropdown.Value>
                    <span>{renderTitle()}</span>
                </Dropdown.Value>
                <ArrowIcon />
            </Dropdown.Trigger>
            <Dropdown.List
                className={cn(
                    'top-[29px] left-0 flex flex-col gap-1 min-w-full w-max py-[8px] px-[10px] rounded-[12px]',
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
 * 외부 상태(api data)와 내부 상태(Dropdown index)를 동기화하는 컴포넌트
 */
function SyncSelection({
    options,
    selectedValue,
}: {
    options: Options[];
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
