import ClubSocialItem from '@/domains/social/ui/ClubSocialItem';
import SearchTab from '@/domains/search/ui/SearchTab';
import { useSearchParams } from 'react-router-dom';
import {
    CentralCategoryDropdown,
    CollegeDropdown,
    DepartmentDropdown,
    UnionCategoryDropdown,
} from '@/domains/search/ui/ClubSearchOptions';
import { useClubSNSByType } from '@/domains/social/api/useClubSNS';
import { useEffect } from 'react';
import { ClubType } from '@/domains/search/api/useClubList';

const VALID_TABS: Record<string, ClubType> = {
    central: 'central',
    union: 'union',
    college: 'college',
    department: 'department',
};

export default function ClubSocialPage() {
    const [searchParams, setSearchParams] = useSearchParams();

    const tabParam = searchParams.get('type') || 'central';
    const currentTabParam = VALID_TABS[tabParam] || 'central';
    const selectedCategory = searchParams.get('category');
    const selectedCollege = searchParams.get('college');
    const selectedDepartment = searchParams.get('department');

    const {
        accounts,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
    } = useClubSNSByType({
        clubType: currentTabParam,
        category: selectedCategory || undefined,
        college: selectedCollege || undefined,
        department: selectedDepartment || undefined,
        size: 12,
    });

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

    const updateSearchParam = (searchKey: string, value: string) => {
        const newParams = new URLSearchParams(searchParams);

        if (searchParams.get(searchKey) === value) {
            newParams.delete(searchKey);
        } else if (value) {
            newParams.set(searchKey, value);
        }

        setSearchParams(newParams);
    };

    return (
        <div className="min-h-screen flex flex-col">
            <div className="flex-1 flex flex-col items-center">
                <div className="w-screen bg-white flex justify-center h-[47px]">
                    <SearchTab />
                </div>

                <div className="min-w-[320px] flex mt-2 gap-[5px] scrollbar-none relative justify-end">
                    {currentTabParam === 'central' && (
                        <CentralCategoryDropdown
                            selectedValue={selectedCategory}
                            onSelect={(value) =>
                                updateSearchParam('category', value)
                            }
                        />
                    )}

                    {currentTabParam === 'college' && (
                        <CollegeDropdown
                            selectedValue={selectedCollege}
                            onSelect={(value) =>
                                updateSearchParam('college', value)
                            }
                        />
                    )}

                    {currentTabParam === 'department' && (
                        <>
                            <CollegeDropdown
                                selectedValue={selectedCollege}
                                onSelect={(value) =>
                                    updateSearchParam('college', value)
                                }
                            />
                            <DepartmentDropdown
                                selectedValue={selectedDepartment}
                                college={selectedCollege || ''}
                                onSelect={(value) =>
                                    updateSearchParam('department', value)
                                }
                            />
                        </>
                    )}

                    {currentTabParam === 'union' && (
                        <UnionCategoryDropdown
                            selectedValue={selectedCategory}
                            onSelect={(value) =>
                                updateSearchParam('category', value)
                            }
                        />
                    )}
                </div>

                <div className="grid grid-cols-3 gap-x-[10px] gap-y-2 py-2 pb-5">
                    {isLoading
                        ? Array.from({ length: 12 }).map((_, index) => (
                              <ClubSocialItem
                                  key={index}
                                  clubName=""
                                  clubSNSId=""
                                  onClick={() => {}}
                                  isLoading
                              />
                          ))
                        : accounts.length > 0
                        ? accounts.map((account, index) => (
                              <ClubSocialItem
                                  key={`${account.clubName}-${account.accountName}-${index}`}
                                  clubName={account.clubName ?? ''}
                                  clubLogoUrl={account.profileImage}
                                  clubSNSId={account.accountName ?? ''}
                                  onClick={() =>
                                      window.open(
                                          account.instagramProfileUrl,
                                          '_blank',
                                      )
                                  }
                              />
                          ))
                        : null}
                </div>
            </div>
        </div>
    );
}
