import ClubSocialItem from '@/domains/social/ui/ClubSocialItem';
import SearchTab from '@/domains/search/ui/SearchTab';
import { useSearchParams } from 'react-router-dom';
import { useClubSNSByType } from '@/domains/social/api/useClubSNS';
import { useScrollRestoration } from '@/hooks/useScrollRestoration';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import ErrorIcon from '@/assets/common/error-icon.svg?react';
import {
    CentralCategoryDropdown,
    CollegeDropdown,
    DepartmentDropdown,
    UnionCategoryDropdown,
} from '@/domains/search/ui/ClubSearchOptions';
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
        pageCount,
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

    const { saveScroll } = useScrollRestoration({
        storageKey: 'social:scroll',
        pageCount,
        isLoading,
        isFetchingNextPage,
        hasNextPage,
        fetchNextPage,
    });

    useInfiniteScroll({ hasNextPage, isFetchingNextPage, fetchNextPage });

    const updateSearchParam = (searchKey: string, value: string) => {
        const newParams = new URLSearchParams(searchParams);

        if (searchParams.get(searchKey) === value) {
            newParams.delete(searchKey);
        } else if (value) {
            newParams.set(searchKey, value);
        }

        setSearchParams(newParams);
    };

    type ValidAccount = (typeof accounts)[0] & {
        accountName: string;
        clubName: string;
        instagramProfileUrl: string;
    };

    const validAccounts = accounts.filter(
        (account): account is ValidAccount =>
            typeof account.accountName === 'string' &&
            typeof account.clubName === 'string' &&
            typeof account.instagramProfileUrl === 'string',
    );

    return (
        <div className="min-h-screen flex flex-col">
            <div className="flex-1 flex flex-col items-center">
                <div className="sticky top-[56px] z-20 w-full bg-white flex justify-center h-[47px]">
                    <SearchTab />
                </div>

                <div className="min-w-[320px] flex mt-4 gap-[5px] scrollbar-none relative justify-end">
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
                                disabled={!selectedCollege}
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

                {isLoading ? (
                    <div className="grid grid-cols-3 gap-x-[10px] gap-y-2 py-2 pb-5">
                        {Array.from({ length: 12 }).map((_, index) => (
                            <ClubSocialItem
                                key={index}
                                clubName=""
                                clubSNSId=""
                                onClick={() => {}}
                                isLoading
                            />
                        ))}
                    </div>
                ) : validAccounts.length > 0 ? (
                    <div className="grid grid-cols-3 gap-x-[10px] gap-y-2 py-2 pb-5">
                        {validAccounts.map((account, index) => (
                            <ClubSocialItem
                                key={`${account.clubName}-${account.accountName}-${index}`}
                                clubName={account.clubName}
                                clubLogoUrl={account.profileImage}
                                clubSNSId={account.accountName}
                                onClick={() => {
                                    saveScroll();
                                    window.location.href =
                                        account.instagramProfileUrl;
                                }}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="w-full h-[400px] flex flex-col justify-center items-center gap-2.5">
                        <ErrorIcon />
                        <h1 className="text-body-03 font-medium text-black">
                            아직 동아리가 없어요.
                        </h1>
                    </div>
                )}
            </div>
        </div>
    );
}
