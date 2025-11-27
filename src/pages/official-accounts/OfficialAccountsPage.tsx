import OfficialAcountItem from '@/components/Common/OfficialAcountItem';
import SearchTab from '@/components/Search/SearchTab';
import { useClubSNS } from '@/hooks/queries/main/useClubSNS';
import styled from 'styled-components';
import { useSearchParams } from 'react-router-dom';
import {
    CentralCategoryDropdown,
    CollegeDropdown,
    DepartmentDropdown,
    UnionCategoryDropdown,
} from '@/components/Search/SearchOptions/ClubSearchOptions';

export default function OfficialAccountsPage() {
    const { data, isLoading, isError } = useClubSNS();
    const [searchParams, setSearchParams] = useSearchParams();

    const accounts = data?.result?.officialAccounts ?? [];

    const currentTab = searchParams.get('type') || 'central';
    const selectedCategory = searchParams.get('category');
    const selectedCollege = searchParams.get('college');
    const selectedDepartment = searchParams.get('department');

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
        <PageContainer>
            <ContentWrapper>
                <TabContainer>
                    <SearchTab />
                </TabContainer>

                <DropdownContainer>
                    {currentTab === 'central' && (
                        <CentralCategoryDropdown
                            selectedValue={selectedCategory}
                            onSelect={(value) =>
                                updateSearchParam('category', value)
                            }
                        />
                    )}

                    {currentTab === 'college' && (
                        <CollegeDropdown
                            selectedValue={selectedCollege}
                            onSelect={(value) =>
                                updateSearchParam('college', value)
                            }
                        />
                    )}

                    {currentTab === 'department' && (
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

                    {currentTab === 'union' && (
                        <UnionCategoryDropdown
                            selectedValue={selectedCategory}
                            onSelect={(value) =>
                                updateSearchParam('category', value)
                            }
                        />
                    )}
                </DropdownContainer>

                <ClubSearchContainer>
                    {isLoading && <div>불러오는 중...</div>}
                    {isError && <div>오류가 발생했습니다.</div>}
                    {accounts &&
                        accounts.length > 0 &&
                        accounts.map((account) => (
                            <OfficialAcountItem
                                key={`${account.clubName}-${account.accountName}`}
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
                        ))}
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

const DropdownContainer = styled.div`
    min-width: 320px;
    display: flex;
    margin-top: 8px;
    gap: 5px;
    scrollbar-width: none;
    position: relative;
    justify-content: flex-end;
`;

const ClubSearchContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-column-gap: 10px;
    grid-row-gap: 8px;
    padding: 8px 0 20px 0;
`;
