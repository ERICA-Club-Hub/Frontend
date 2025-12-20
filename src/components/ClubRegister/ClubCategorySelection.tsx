import useToggle from '@/hooks/actions/useToggle';
import {
    RegistrationInnerWrapper,
    RegistrationLabel,
} from '@/components/Common';
import { Dropdown } from '../Common';
import ExpandArrowIcon from '@/assets/common/expand-arrow.svg?react';
import { clubCategory } from '@/constants';
import { IClubRegisterValue } from '@/types';
import { cn } from '@/utils/cn';

interface IClubCategorySelection {
    inputValue: IClubRegisterValue;
    setInputValue: React.Dispatch<React.SetStateAction<IClubRegisterValue>>;
}

function ClubCategorySelection({
    inputValue,
    setInputValue,
}: IClubCategorySelection) {
    const { isOpen, setIsOpen, toggle } = useToggle();
    const hasSelectedValue = !!inputValue.category;

    // 카테고리 선택 시, 해당 카테고리의 데이터명(ex.ART)이 아닌 label(ex.예술)을 렌더링
    const renderCategoryTitle = () => {
        const category = clubCategory.find(
            (category) => category.name === inputValue.category,
        );
        return category ? category.label : '카테고리 선택';
    };

    return (
        <RegistrationInnerWrapper>
            <RegistrationLabel>동아리 카테고리</RegistrationLabel>
            <Dropdown setIsOpen={setIsOpen}>
                <Dropdown.Header onClick={toggle}>
                    <strong className="flex justify-between items-center w-[320px] h-[45px] px-[17px] py-[14px] rounded-[10px] text-body-03 font-normal text-neutral-500 bg-white">
                        <h4
                            className={cn(
                                'text-body-03',
                                hasSelectedValue
                                    ? 'font-medium text-black'
                                    : 'font-normal text-neutral-500',
                            )}
                        >
                            {renderCategoryTitle()}
                        </h4>
                        <div
                            className={cn(
                                'flex justify-center items-center transition-transform duration-300 ease-in-out',
                                isOpen ? 'rotate-90' : 'rotate-0',
                            )}
                        >
                            <ExpandArrowIcon />
                        </div>
                    </strong>
                </Dropdown.Header>
                <Dropdown.Menu isOpen={isOpen}>
                    <ul className="absolute top-[5px] left-0 flex flex-wrap justify-center items-center p-[10px] gap-[10px] w-[320px] rounded-[10px] bg-white shadow-[0px_3px_3px_rgba(0,0,0,0.1)]">
                        {clubCategory.map((item, index) => {
                            const isSelected = inputValue.category === item.name;
                            return (
                                <li
                                    key={`club-category-${index}`}
                                    onClick={() => {
                                        setInputValue({
                                            ...inputValue,
                                            category: item.name,
                                        });
                                        toggle();
                                    }}
                                    className={cn(
                                        'flex justify-center items-center w-[145px] h-9 rounded-[5px] text-body-03 cursor-pointer',
                                        isSelected
                                            ? 'font-semibold text-white bg-primary-500'
                                            : 'font-normal text-black bg-neutral-100',
                                    )}
                                >
                                    {item.label}
                                </li>
                            );
                        })}
                    </ul>
                </Dropdown.Menu>
            </Dropdown>
        </RegistrationInnerWrapper>
    );
}

export { ClubCategorySelection };
