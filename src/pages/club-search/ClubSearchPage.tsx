import { InputField } from '@/components/Common';
import CLubListDropdown from '@/components/Search/CLubListDropdown';
import SearchTab from '@/components/Search/SearchTab';
import { useClubSearchFromUrl } from '@/hooks/queries/useClubList';
import styled from 'styled-components';
import ReadingGlassIcon from '@/assets/common/reading_glass.svg?react';
import ClubCard from '@/components/Common/ClubCard';
import ErrorIcon from '@/assets/common/error-icon.svg?react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import {
    getCentralCategoryOptions,
    getCollegeOptions,
    getDepartmentOptions,
    getUnionCategoryOptions,
} from '@/utils/searchKeywordMapping';

export default function ClubSearchPage() {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [currentKeyword, setCurrentKeyword] = useState<string>('');

    const { data, isLoading, refetch } = useClubSearchFromUrl(currentKeyword);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const handleSearch = () => {
        setCurrentKeyword(searchTerm);
        refetch();
    };

    return (
        <PageContainer>
            <ContentWrapper>
                <TabContainer>
                    <SearchTab />
                </TabContainer>
                <ClubSearchContainer>
                    <SearchInputWrapper>
                        <InputField
                            inputSize="large"
                            placeholder="원하는 동아리를 검색해 보세요."
                            value={searchTerm}
                            onChange={(e) => handleInputChange(e)}
                        />
                        <SearchIcon onClick={handleSearch}>
                            <ReadingGlassIcon />
                        </SearchIcon>
                    </SearchInputWrapper>

                    <DropdownContainer>
                        {/* TODO dropdown 공통 컴포넌트 활용하는 거로 바꾸기 */}
                        <CLubListDropdown
                            searchKey="sortBy"
                            title="정렬"
                            menuList={[
                                '가나다순으로 정렬',
                                '분과순으로 정렬',
                                '모집기준으로 정렬',
                            ]}
                        />
                        <CLubListDropdown
                            searchKey="status"
                            title="모집 상태"
                            menuList={['모집중', '모집예정', '모집완료']}
                        />
                        <CLubListDropdown
                            searchKey="college"
                            title="단과대명"
                            menuList={getCollegeOptions().map(
                                (option) => option.label,
                            )}
                        />
                        <CLubListDropdown
                            searchKey="department"
                            title="학과명"
                            menuList={getDepartmentOptions(
                                /*selectedCollege ||*/ undefined,
                            ).map((option) => option.label)}
                        />
                        <CLubListDropdown
                            searchKey="category"
                            title="연합 동아리 카테고리"
                            menuList={getUnionCategoryOptions().map(
                                (option) => option.label,
                            )}
                        />
                        <CLubListDropdown
                            searchKey="category"
                            title="동아리 카테고리"
                            menuList={getCentralCategoryOptions().map(
                                (option) => option.label,
                            )}
                        />
                    </DropdownContainer>

                    <ClubListWrapper>
                        {isLoading ? (
                            <div>로딩 중...</div>
                        ) : data && data.content.length > 0 ? (
                            data.content.map((club) => {
                                return (
                                    <ClubCard
                                        key={club.id}
                                        title={club.name}
                                        subTitle={club.oneLiner}
                                        categoryName={club.categoryName}
                                        recruitmentStatus={
                                            club.recruitmentStatus
                                        }
                                        onClick={() =>
                                            navigate(`/club/${club.id}`)
                                        }
                                    />
                                );
                            })
                        ) : (
                            <NoResultContainer>
                                <ErrorIcon />
                                <h1>검색 결과가 없어요.</h1>
                            </NoResultContainer>
                        )}
                    </ClubListWrapper>
                </ClubSearchContainer>
            </ContentWrapper>
        </PageContainer>
    );
}

const PageContainer = styled.div`
    min-height: 100vh;
    display: flex;
    flex-direction: column;
`;

const ContentWrapper = styled.div`
    flex: 1 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const TabContainer = styled.div`
    width: 100vw;
    background-color: white;
    display: flex;
    justify-content: center;
    height: 47px;
`;

const ClubSearchContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px 0;
`;

const SearchInputWrapper = styled.div`
    position: relative;
    display: inline-block;
    width: 320px;
`;

const SearchIcon = styled.button`
    position: absolute;
    right: 15px;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const DropdownContainer = styled.div`
    display: flex;
    width: 320px;
    margin-top: 23px;
    margin-bottom: 10px;
    gap: 5px;
    flex-wrap: wrap;
    scrollbar-width: none;
    position: relative;
`;

const ClubListWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
`;

const NoResultContainer = styled.div`
    width: 100%;
    height: 400px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;

    h1 {
        font-size: 14px;
        font-weight: 500;
        color: ${(props) => props.theme.colors.mainBlack};
    }
`;
