import styled from 'styled-components';
import { useState } from 'react';
import { InputField } from '@/components/Common/InputField';
import { useNavigate } from 'react-router-dom';
import ClubCard from '@/components/Common/ClubCard';
import ErrorIcon from '@/assets/common/error-icon.svg?react';
import ReadingGlassIcon from '@/assets/common/reading_glass.svg?react';
import MainThumbnail from '@/assets/common/MainThumbnail.svg?react';
import { Footer } from '@/components/Common/Footer';
import Survey from '@/components/Main/Survey';
import SearchTab from '@/components/Search/SearchTab';
import { useClubSearchFromUrl } from '@/hooks/queries/useClubList';
import CLubListDropdown from '@/components/Search/CLubListDropdown';

const ClubListPage = () => {
    const navigate = useNavigate();

    const [searchTerm, setSearchTerm] = useState<string>(''); // 검색어 상태

    const handleSearch = () => {
        // 엔터나 검색 버튼 클릭 시에도 searchTerm이 변경되어 자동으로 fetchClubs가 호출됨
    };

    const { data, isLoading } = useClubSearchFromUrl();

    return (
        <PageContainer>
            <ContentWrapper>
                <AnnouncementContainer>
                    <MainButton
                        onClick={() =>
                            window.open(
                                'https://snowy-middle-3a3.notion.site/hanjari',
                                '_blank',
                            )
                        }
                    >
                        <MainThumbnail />
                    </MainButton>
                </AnnouncementContainer>
                <Survey />
                <SearchTab />
                <ClubSearchContainer>
                    <SearchInputWrapper>
                        <InputField
                            inputSize="large"
                            placeholder="원하는 동아리를 검색해 보세요."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
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
                            searchKey="sortBy"
                            title="정렬"
                            menuList={[
                                '가나다순으로 정렬',
                                '분과순으로 정렬',
                                '모집기준으로 정렬',
                            ]}
                        />
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
                            searchKey="sortBy"
                            title="정렬"
                            menuList={[
                                '가나다순으로 정렬',
                                '분과순으로 정렬',
                                '모집기준으로 정렬',
                            ]}
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
                {/* <WhoMakeContainer>
                    <WhoMakeButton onClick={() => window.open('페이지 링크', '_blank')}>
                        <WhoMake />
                        <SurveyCardArrow />
                    </WhoMakeButton>
                </WhoMakeContainer> */}
            </ContentWrapper>
            <Footer />
        </PageContainer>
    );
};

export { ClubListPage };

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

const AnnouncementContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    overflow: hidden;
    position: relative;
`;

const MainButton = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    display: flex;
    align-items: center;
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
    overflow-x: auto;
    scrollbar-width: none;
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
