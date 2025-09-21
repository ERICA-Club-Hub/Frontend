import styled from 'styled-components';
import { InputField } from '@/components/Common';
import SearchIcon from '@/assets/common/search.svg?react';

interface SearchInputProps {
    value: string; // 검색어 상태
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // 검색어 변경 핸들러
}

export default function SearchInput({ value, onChange }: SearchInputProps) {
    return (
        <InputWrapper>
            <StyledSearchIcon />
            <SearchInputField
                inputSize="large"
                placeholder="동아리 검색"
                value={value}
                onChange={onChange}
            />
        </InputWrapper>
    );
}

const InputWrapper = styled.div`
    position: relative;
`;

const StyledSearchIcon = styled(SearchIcon)`
    position: absolute;
    left: 15px;
    top: 50%;
    transform: translateY(-50%);
    color: #989898;
`;

const SearchInputField = styled(InputField)`
    padding: 14px 19px 14px 40px;
`;
