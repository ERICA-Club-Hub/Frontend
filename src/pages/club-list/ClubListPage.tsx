import styled from 'styled-components';
import { useState } from 'react';
import { InputField } from '@/components/Common/InputField';
import { useNavigate } from 'react-router-dom';
import ClubCard from '@/components/Common/ClubCard';
import SortingDropdown from '@/components/Common/SortingDropdown';
import ErrorIcon from '@/assets/common/error-icon.svg?react';
import ReadingGlassIcon from '@/assets/common/reading_glass.svg?react';
import MainThumbnail from '@/assets/common/MainThumbnail.svg?react';
import { Footer } from '@/components/Common/Footer';
import Survey from '@/components/Main/Survey';
import SearchTab from '@/components/Search/SearchTab';
import { useClubSearchFromUrl } from '@/hooks/queries/useClubList';

const ClubListPage = () => {
    const navigate = useNavigate();

    // 각각의 드롭다운을 위한 별도의 상태 관리
    const [categoryFilter, setCategoryFilter] = useState<string>('none'); // 분과 필터 상태
    const [recruitmentStatus, setRecruitmentStatus] = useState<string>('none'); // 모집상태 필터 상태
    const [sortOrder, setSortOrder] = useState<string>('none'); // 정렬 기준 필터 상태
    // 검색 기능을 위한 상태 관리
    const [searchTerm, setSearchTerm] = useState<string>(''); // 검색어 상태

    const handleSearch = () => {
        // 엔터나 검색 버튼 클릭 시에도 searchTerm이 변경되어 자동으로 fetchClubs가 호출됨
    };

    // 분과 선택 시 실행되는 함수
    const handleCategorySelect = (value: string) => {
        setCategoryFilter(value);
    };

    // 모집상태 선택 시 실행되는 함수
    const handleRecruitmentStatusSelect = (value: string) => {
        setRecruitmentStatus(value);
    };

    // 정렬 기준 선택 시 실행되는 함수
    const handleSort = (value: string) => {
        setSortOrder(value);
    };

    // 동아리 상세 페이지로 이동
    const handleCardClick = (clubId: number) => {
        navigate(`/club/${clubId}`);
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
                        <SortingDropdown
                            key="sort-dropdown"
                            options={[
                                { label: '가나다순으로 정렬', value: 'none' },
                                { label: '카테고리로 정렬', value: 'category' },
                                {
                                    label: '모집기준으로 정렬',
                                    value: 'recruitment',
                                },
                            ]}
                            onSelect={handleSort}
                            defaultText="가나다순으로 정렬"
                            value={sortOrder}
                            align="left"
                        />
                        <RightDropdowns>
                            <SortingDropdown
                                key="category-dropdown"
                                options={[
                                    { label: '선택없음', value: 'none' },
                                    { label: '봉사분과', value: 'volunteer' },
                                    { label: '예술분과', value: 'art' },
                                    { label: '종교분과', value: 'religion' },
                                    { label: '체육분과', value: 'sports' },
                                    {
                                        label: '학술교양분과',
                                        value: 'academic',
                                    },
                                    { label: '연합동아리', value: 'union' },
                                ]}
                                onSelect={handleCategorySelect}
                                defaultText="선택없음"
                                value={categoryFilter}
                                align="right"
                            />
                            <SortingDropdown
                                key="recruitment-dropdown"
                                options={[
                                    { label: '선택없음', value: 'none' },
                                    { label: '모집예정', value: 'upcoming' },
                                    { label: '모집중', value: 'open' },
                                    { label: '모집마감', value: 'closed' },
                                ]}
                                onSelect={handleRecruitmentStatusSelect}
                                defaultText="선택없음"
                                value={recruitmentStatus}
                                align="right"
                            />
                        </RightDropdowns>
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
                                        onClick={() => handleCardClick(club.id)}
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
    justify-content: space-between;
    width: 320px;
    margin-top: 23px;
    margin-bottom: 10px;
`;

const RightDropdowns = styled.div`
    display: flex;
    gap: 8px;
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
