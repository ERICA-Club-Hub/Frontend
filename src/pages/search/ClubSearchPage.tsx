import InputField from '@/components/InputField/InputField';
import SearchTab from '@/domains/search/ui/SearchTab';
import { useClubSearchFromUrl } from '@/domains/search/api/useClubList';
import ClubCard from '@/domains/shared/components/card/ClubCard';
import ErrorIcon from '@/assets/common/error-icon.svg?react';
import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
    CentralCategoryDropdown,
    CollegeDropdown,
    DepartmentDropdown,
    SortByDropdown,
    StatusDropdown,
    UnionCategoryDropdown,
} from '@/domains/search/ui/ClubSearchOptions';
import { PATHS } from '@/routes/paths';
import SearchIcon from '@/assets/search.svg?react';

export default function ClubSearchPage() {
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
        <div className="min-h-screen flex flex-col">
            <div className="flex-1 flex flex-col items-center">
                <div className="w-screen bg-white flex justify-center h-[47px]">
                    <SearchTab />
                </div>
                <div className="flex flex-col items-center py-5">
                    <div className="relative inline-block w-[320px]">
                        <InputField
                            inputType="search"
                            placeholder="원하는 동아리를 검색해 보세요."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onKeyDown={handleKeyDown}
                            className="w-[320px] h-[48px]"
                            leftIcon={<SearchIcon />}
                        />
                    </div>

                    <div className="flex w-[320px] mt-[23px] mb-[10px] gap-[5px] flex-wrap relative">
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
                    </div>

                    <div className="flex flex-col items-center gap-2">
                        {isLoading ? (
                            <div>로딩 중...</div>
                        ) : data && allClubs.length > 0 ? (
                            allClubs.map((club) => {
                                if (!club) return null;
                                return (
                                    <ClubCard
                                        key={club.id}
                                        title={club.name}
                                        subTitle={club.oneLiner}
                                        categoryName={club.tag}
                                        recruitmentStatus={
                                            club.recruitmentStatus
                                        }
                                        profileImageUrl={club.profileImageUrl}
                                        to={PATHS.CLUB_DETAIL(club.id)}
                                    />
                                );
                            })
                        ) : (
                            <div className="w-full h-[400px] flex flex-col justify-center items-center gap-[10px]">
                                <ErrorIcon />
                                <h1 className="text-body-03 font-medium text-black">
                                    검색 결과가 없어요.
                                </h1>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
