import { InputField } from '@/components/Common';
import SearchTab from '@/components/Search/SearchTab';
import { useClubSearchFromUrl } from '@/hooks/queries/useClubList';
import styled from 'styled-components';
import ReadingGlassIcon from '@/assets/common/reading_glass.svg?react';
import ClubCard from '@/components/Common/ClubCard';
import ErrorIcon from '@/assets/common/error-icon.svg?react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
    CentralCategoryDropdown,
    CollegeDropdown,
    DepartmentDropdown,
    SortByDropdown,
    StatusDropdown,
    UnionCategoryDropdown,
} from '@/components/Search/SearchOptions/ClubSearchOptions';

export default function ClubSearchPage() {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState<string>('');

    const {
        data,
        isLoading,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        refetch,
    } = useClubSearchFromUrl();
    const allClubs = data?.pages.flatMap((page) => page.content) || [];

    const [searchKeyword, setSearchKeyword] = useSearchParams();

    // 현재 선택된 값들
    const selectedCollege = searchKeyword.get('college');
    const selectedDepartment = searchKeyword.get('department');
    const selectedStatus = searchKeyword.get('status');
    const selectedSortBy = searchKeyword.get('sortBy');
    const selectedCategory = searchKeyword.get('category');
    const currentKeyword = searchKeyword.get('keyword') || '';

    const currentTab = searchKeyword.get('type') || 'central';

    useEffect(() => {
        setSearchTerm(currentKeyword);
    }, [currentKeyword]);

    const handleSearch = () => {
        const newParams = new URLSearchParams(searchKeyword);

        if (searchTerm.trim()) {
            newParams.set('keyword', searchTerm.trim());
        } else {
            newParams.delete('keyword');
        }

        setSearchKeyword(newParams);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    const updateSearchParam = (searchKey: string, value: string) => {
        const newParam = new URLSearchParams(searchKeyword);

        if (searchKeyword.get(searchKey) === value) {
            newParam.delete(searchKey);
        } else if (value) {
            newParam.set(searchKey, value);
        }

        setSearchKeyword(newParam);
        refetch();
    };

    useEffect(() => {
        const handleScroll = () => {
            if (
                window.innerHeight + document.documentElement.scrollTop >=
                document.documentElement.offsetHeight - 1000
            ) {
                if (hasNextPage && !isFetchingNextPage) {
                    fetchNextPage();
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

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
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                        <SearchIcon onClick={handleSearch}>
                            <ReadingGlassIcon />
                        </SearchIcon>
                    </SearchInputWrapper>

                    <DropdownContainer>
                        <SortByDropdown
                            selectedValue={selectedSortBy}
                            onSelect={(value) =>
                                updateSearchParam('sortBy', value)
                            }
                        />
                        <StatusDropdown
                            selectedValue={selectedStatus}
                            onSelect={(value) =>
                                updateSearchParam('status', value)
                            }
                        />
                        {(currentTab === 'college' ||
                            currentTab === 'department') && (
                            <>
                                <CollegeDropdown
                                    selectedValue={selectedCollege}
                                    onSelect={(value) =>
                                        updateSearchParam('college', value)
                                    }
                                />
                                {currentTab === 'department' && (
                                    <DepartmentDropdown
                                        selectedValue={selectedDepartment}
                                        college={selectedCollege || ''}
                                        onSelect={(value) =>
                                            updateSearchParam(
                                                'department',
                                                value,
                                            )
                                        }
                                    />
                                )}
                            </>
                        )}
                        {currentTab === 'central' && (
                            <CentralCategoryDropdown
                                selectedValue={selectedCategory}
                                onSelect={(value) =>
                                    updateSearchParam('category', value)
                                }
                            />
                        )}

                        {currentTab === 'union' && (
                            <UnionCategoryDropdown
                                selectedValue={selectedCategory}
                                onSelect={(value) =>
                                    updateSearchParam('category', value)
                                }
                            />
                        )}
                    </DropdownContainer>

                    <ClubListWrapper>
                        {isLoading ? (
                            <div>로딩 중...</div>
                        ) : data && allClubs.length > 0 ? (
                            allClubs.map((club) => {
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
