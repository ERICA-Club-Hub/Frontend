import styled from 'styled-components';
import { InputField } from '@/components/Common';
import SearchIcon from '@/assets/common/search.svg?react';

interface ClubListPageLayoutProps {
    value: string; // 검색어 상태
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // 검색어 변경 핸들러
    filters?: React.ReactNode; // 필터 컴포넌트
    clubList: React.ReactNode; // 동아리 리스트 컴포넌트
}

export default function ClubListPageLayout({
    value,
    onChange,
    clubList,
    filters,
}: ClubListPageLayoutProps) {
    return (
        <Container>
            {/* 검색어 입력 필드 */}
            <InputWrapper $filters={!!filters}>
                <StyledSearchIcon />
                <SearchInputField
                    inputSize="large"
                    placeholder="동아리 검색"
                    value={value}
                    onChange={onChange}
                />
            </InputWrapper>

            {/* 필터 컴포넌트 */}
            {filters && <FilterWrapper>{filters}</FilterWrapper>}

            {/* 동아리 리스트 컴포넌트 */}
            {clubList}
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
`;

const InputWrapper = styled.div<{ $filters: boolean }>`
    position: relative;
    margin-bottom: ${({ $filters }) => ($filters ? '15px' : '20px')};
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

const FilterWrapper = styled.div`
    display: flex;
    gap: 5px;
    margin-bottom: 15px;
`;
