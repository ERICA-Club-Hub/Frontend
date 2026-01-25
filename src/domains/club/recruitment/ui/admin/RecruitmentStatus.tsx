import { Dropdown } from '@/components/Common';
import DropdownArrow from '@/assets/common/dropdown_arrow.svg?react';
import { AdminSection, AdminSectionLabel } from '@/components/Common';
import useToggle from '@/hooks/actions/useToggle';
import { recruitStatus } from '@/domains/shared/constants/club-detail-register.constant';
import { ISummaryInfoValue } from '@/types';
import { cn } from '@/utils/cn';

interface IRecruitmentStatus {
    inputValue: ISummaryInfoValue;
    setInputValue: React.Dispatch<React.SetStateAction<ISummaryInfoValue>>;
}

function RecruitmentStatus({ inputValue, setInputValue }: IRecruitmentStatus) {
    const { isOpen, setIsOpen, toggle } = useToggle();

    // 동아리 모집 여부 상태 변경
    const handleRecruitmentStatus = (item: { value: string }) => {
        setInputValue({
            ...inputValue,
            recruitmentStatus: item.value,
        });
        toggle();
    };

    const hasSelectedValue = !!inputValue.recruitmentStatus;

    return (
        <AdminSection className="h-[101px] gap-[8px]">
            <AdminSectionLabel>동아리 모집 여부</AdminSectionLabel>
            <Dropdown setIsOpen={setIsOpen}>
                <Dropdown.Header onClick={toggle}>
                    <div
                        className={cn(
                            'flex justify-between items-center w-[280px] h-[40px] px-[15px] rounded-[10px] bg-neutral-100',
                        )}
                    >
                        <h4
                            className={cn(
                                'text-body-03',
                                hasSelectedValue
                                    ? 'font-medium text-black'
                                    : 'font-normal text-neutral-400',
                            )}
                        >
                            {inputValue.recruitmentStatus === 'UPCOMING'
                                ? '모집예정'
                                : inputValue.recruitmentStatus === 'OPEN'
                                ? '모집중'
                                : inputValue.recruitmentStatus === 'CLOSED'
                                ? '모집완료'
                                : '모집기준 선택'}
                        </h4>
                        <div
                            className={cn(
                                'transition-transform duration-[400ms] ease-in-out',
                                isOpen ? 'rotate-180' : 'rotate-0',
                            )}
                        >
                            <DropdownArrow />
                        </div>
                    </div>
                </Dropdown.Header>
                <Dropdown.Menu isOpen={isOpen}>
                    <ul className="flex flex-col justify-center items-center gap-[5px] absolute top-[11px] left-0 w-[280px] h-[138px] rounded-[10px] bg-white shadow-[0px_3px_3px_rgba(0,0,0,0.1)]">
                        {recruitStatus.map((item, index) => {
                            const isSelected =
                                inputValue.recruitmentStatus === item.value;
                            return (
                                <li
                                    key={`recruit-status-${index}`}
                                    onClick={() =>
                                        handleRecruitmentStatus(item)
                                    }
                                    className={cn(
                                        'flex justify-center items-center w-[260px] h-[36px] rounded-[5px] text-body-03 cursor-pointer',
                                        isSelected
                                            ? 'text-white bg-primary-500'
                                            : 'text-black bg-neutral-100',
                                    )}
                                >
                                    {item.label}
                                </li>
                            );
                        })}
                    </ul>
                </Dropdown.Menu>
            </Dropdown>
        </AdminSection>
    );
}

export { RecruitmentStatus };
