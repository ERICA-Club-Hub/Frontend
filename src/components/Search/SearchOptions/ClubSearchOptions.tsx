import {
    getCentralCategoryOptions,
    getCollegeOptions,
    getDepartmentOptions,
    getUnionCategoryOptions,
} from '@/utils/search/searchKeywordMapping';
import ClubListDropdown from './ClubListDropdown';

interface DropdownProps {
    selectedValue?: string | null;
    onSelect: (value: string) => void;
}

export function SortByDropdown({ selectedValue, onSelect }: DropdownProps) {
    const options = [
        { value: 'NAME_ASC', label: '가나다순으로 정렬' },
        { value: 'CATEGORY_ASC', label: '분과순으로 정렬' },
        { value: 'RECRUITMENT_STATUS_ASC', label: '모집기준으로 정렬' },
    ];
    return (
        <ClubListDropdown
            title="정렬"
            options={options}
            selectedValue={selectedValue}
            onSelect={onSelect}
        />
    );
}

export function StatusDropdown({ selectedValue, onSelect }: DropdownProps) {
    const options = [
        { value: 'OPEN', label: '모집중' },
        { value: 'UPCOMING', label: '모집예정' },
        { value: 'CLOSED', label: '모집완료' },
    ];

    return (
        <ClubListDropdown
            title="모집 상태"
            selectedValue={selectedValue}
            options={options}
            onSelect={onSelect}
        />
    );
}

export function CollegeDropdown({ selectedValue, onSelect }: DropdownProps) {
    return (
        <ClubListDropdown
            title="단과대명"
            selectedValue={selectedValue}
            options={getCollegeOptions()}
            onSelect={onSelect}
        />
    );
}

interface DepartmentDropdownProps extends DropdownProps {
    college?: string;
}

export function DepartmentDropdown({
    selectedValue,
    onSelect,
    college,
}: DepartmentDropdownProps) {
    return (
        <ClubListDropdown
            title="단과대명"
            selectedValue={selectedValue}
            options={getDepartmentOptions(college)}
            onSelect={onSelect}
        />
    );
}

export function UnionCategoryDropdown({
    selectedValue,
    onSelect,
}: DropdownProps) {
    return (
        <ClubListDropdown
            title="연합 동아리 카테고리"
            selectedValue={selectedValue}
            options={getUnionCategoryOptions()}
            onSelect={onSelect}
        />
    );
}

export function CentralCategoryDropdown({
    selectedValue,
    onSelect,
}: DropdownProps) {
    return (
        <ClubListDropdown
            title="중앙 동아리 카테고리"
            selectedValue={selectedValue}
            options={getCentralCategoryOptions()}
            onSelect={onSelect}
        />
    );
}
