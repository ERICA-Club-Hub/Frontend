import {
    RegistrationInnerWrapper,
    RegistrationLabel,
} from '@/domains/club/registration/ui/RegistrationForm';
import ArrowIcon from '@/assets/common/expand-arrow.svg?react';
import { cn } from '@/utils/cn';
import { clubCategory } from '@/constants/navigations.constant';
import { IClubRegisterValue } from '@/types/input-value.types';
import createDropdown from '@/components/Dropdown/Dropdown';
import Button from '@/components/Button/Button';

interface DropdownItemType {
    label: string;
    value: string;
}

const Dropdown = createDropdown<DropdownItemType>();

interface SelectDropdownProps {
    inputValue: IClubRegisterValue;
    setInputValue: React.Dispatch<React.SetStateAction<IClubRegisterValue>>;
    placeholder: string;
}

// TODO: 다양한 카테고리에서 재사용 가능하도록 일반화 필요 -> domains/shared에서 관리? (폼 리팩토링 시 함께 진행)
// 이미 선택한 카테고리가 있을 때 받아와서 표시해주는 기능도 추가 필요
export default function SelectDropdown({
    inputValue,
    setInputValue,
    placeholder,
}: SelectDropdownProps) {
    const hasSelectedValue = !!inputValue.category;

    // 카테고리 선택 시, 해당 카테고리의 데이터명(ex.ART)이 아닌 label(ex.예술)을 렌더링
    const renderCategoryTitle = () => {
        const category = clubCategory.find(
            (category) => category.value === inputValue.category,
        );
        return category ? category.label : placeholder;
    };

    return (
        <RegistrationInnerWrapper>
            <RegistrationLabel>동아리 카테고리</RegistrationLabel>

            <Dropdown.Container itemOptions={clubCategory}>
                <Dropdown.Trigger
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
                                    {renderCategoryTitle()}
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
                        'top-[50px] left-0 flex justify-center items-center flex-wrap gap-x-[8px] gap-y-[10px] min-w-full p-[12px] px-[8px] rounded-[8px] bg-neutral-00 animate-dropdown',
                    )}
                >
                    {clubCategory.map((item, idx) => (
                        <Dropdown.Item
                            key={item.value}
                            index={idx}
                            onClick={() => {
                                setInputValue({
                                    ...inputValue,
                                    category: item.value,
                                });
                            }}
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
        </RegistrationInnerWrapper>
    );
}
