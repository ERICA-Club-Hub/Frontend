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
import SearchIcon from '@/assets/search.svg?react';

/**
 * 동아리 검색 공용 위젯 컴포넌트
 * @param getClubDetailPath - 동아리 상세 페이지로 이동하기 위한 경로 생성 함수
 * @usage - 유저 카테고리 검색 페이지 / 서비스 어드민 동아리 관리 페이지
 */
export default function ClubSearchWidget({
    getClubDetailPath,
}: {
    getClubDetailPath: (clubId?: number) => string;
}) {
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
                <div className="sticky top-[56px] z-10 w-full bg-white flex justify-center">
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
                            Array.from({ length: 6 }).map((_, index) => (
                                <ClubCard key={index} to="" isLoading />
                            ))
                        ) : data && allClubs.length > 0 ? (
                            allClubs.map((club) => {
                                if (!club || !club?.id) return null;
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
                                        to={getClubDetailPath(club.id)}
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
