import styled from 'styled-components';
import { useState, useEffect, useCallback } from 'react';
import { InputField } from '@/components/Common/InputField';
import { apiRequest } from '@/api/apiRequest';
import { getCategoryEmoji } from '@/utils/getCategoryEmoji';
import { useNavigate } from 'react-router-dom';
import MainpageCard from '@/components/Common/MainpageCard';
import SortingDropdown from '@/components/Common/SortingDropdown';
import ErrorIcon from '@/assets/common/error-icon.svg?react';
// import MainPrevArrow from '@/assets/common/main_prev_arrow.svg?react';
// import MainNextArrow from '@/assets/common/main_next_arrow.svg?react';
import ReadingGlassIcon from '@/assets/common/reading_glass.svg?react';
import MainThumbnail from '@/assets/common/MainThumbnail.svg?react';
import SurveyBox from '@/assets/common/surveyBox.svg?react';
import SurveyCardArrow from '@/assets/common/surveyCard_arrow.svg?react';
// import WhoMake from '@/assets/common/whoMake.svg?react';
import Footer from '@/components/Common/Footer';
import Modal from '@/components/Common/Modal/Modal';

// 페이지 컨테이너
const PageContainer = styled.div`
    min-height: 100vh;
    display: flex;
    flex-direction: column;
`;

// 컨텐츠 컨테이너
const ContentWrapper = styled.div`
    flex: 1 0 auto;
`;

// 공지사항 컨테이너
const AnnouncementContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    overflow: hidden;
    position: relative;
`;

// 공지사항 버튼
const MainButton = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    display: flex;
    align-items: center;
`;

// 설문조사 컨테이너
const SurveyBoxContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
`;

// 설문조사 버튼
const SurveyButton = styled.button`
    position: relative;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    display: flex;
    align-items: center;

    svg:last-child {
        position: absolute;
        right: 25px;
        top: 50%;
        transform: translateY(-50%);
    }
`;

// const MainAnnouncement = styled.button<{ $imageUrl: string }>`
//     position: relative;
//     width: 200px;
//     height: 200px;
//     flex-shrink: 0;
//     border-radius: 10px;
//     background: ${(props) => `url(${props.$imageUrl})`} lightgray 50% / cover
//         no-repeat;
//     border: none;
//     cursor: pointer;
// `;

// const StatusIndicator = styled.div`
//     position: absolute;
//     bottom: -20px;
//     left: 50%;
//     transform: translateX(-50%);
//     width: 42px;
//     height: 8px;
//     flex-shrink: 0;
//     background: white;
//     border-radius: 4px;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     gap: 3px;
// `;

// const StatusDot = styled.div<{ $active: boolean }>`
//     width: ${(props) => (props.$active ? '10px' : '4px')};
//     height: 4px;
//     border-radius: 2px;
//     background-color: ${(props) => (props.$active ? props.theme.colors.mainBlue : props.theme.colors.bgLightBlue)};
//     transition: all 0.3s ease;
// `;

// const SubAnnouncement = styled.button<{ $imageUrl: string }>`
//     width: 200px;
//     height: 200px;
//     flex-shrink: 0;
//     border-radius: 10px;
//     background: ${(
//             props,
//         ) => `linear-gradient(0deg, rgba(0, 0, 0, 0.40) 0%, rgba(0, 0, 0, 0.40) 100%),
//                 url(${props.$imageUrl})`}
//         ${props => props.theme.colors.lightGray} 50% / cover no-repeat;
//     border: none;
//     cursor: pointer;
// `;

// const ArrowButton = styled.button`
//     width: 22px;
//     height: 22px;
//     flex-shrink: 0;
//     border: none;
//     background: none;
//     cursor: pointer;
//     padding: 0;
//     position: absolute;
//     top: 50%;
//     transform: translateY(-50%);
//     z-index: 1;

//     &:first-child {
//         left: 50%;
//         transform: translateX(-150px) translateY(-50%);
//     }

//     &:last-child {
//         right: 50%;
//         transform: translateX(150px) translateY(-50%);
//     }
// `;

// 검색 컨테이너
const ClubSearchContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px 0;
`;

// 검색 입력 컨테이너
const SearchInputWrapper = styled.div`
    position: relative;
    display: inline-block;
    width: 320px;
`;

// 검색 아이콘
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

// 검색 입력 컨테이너
const DropdownContainer = styled.div`
    display: flex;
    justify-content: space-between;
    width: 320px;
    margin-top: 23px;
    margin-bottom: 10px;
`;

// 드롭다운 컨테이너
const RightDropdowns = styled.div`
    display: flex;
    gap: 8px;
`;

// 동아리 목록 컨테이너
const ClubListWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
`;

// 검색 결과가 없을 때 표시되는 컨테이너
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
        color: ${props => props.theme.colors.mainBlack};
    }
`;

// // whoMake 버튼 컨테이너
// const WhoMakeContainer = styled.div`
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     margin-bottom: 20px;
// `;

// // whoMake 버튼
// const WhoMakeButton = styled.button`
//     position: relative;
//     background: none;
//     border: none;
//     cursor: pointer;
//     padding: 0;
//     display: flex;
//     align-items: center;

//     svg:last-child {
//         position: absolute;
//         right: 25px;
//         top: 50%;
//         transform: translateY(-50%);
//     }
// `;

// 타입 정의 부분에 TagType 추가
type TagType = '동아리 및 질문' | '모집중' | '모집마감' | '모집예정';

// clubs 상태 타입 정의 수정
interface Club {
    id: number;
    name: string;
    description: string;
    category: string;
    recruitmentStatus: 'UPCOMING' | 'OPEN' | 'CLOSED';
    activities: string | null;
    leaderName: string | null;
    leaderEmail: string;
    leaderPhone: string | null;
    membershipFee: number | null;
    snsUrl: string | null;
    applicationUrl: string | null;
}

// API 응답 타입 정의 수정
interface ApiResponse {
    isSuccess: boolean;
    code: string;
    message: string;
    result: {
        clubs: Club[];
        totalElements: number;
    };
}

// interface Announcement {
//     announcementId: number;
//     title: string;
//     date: string;
//     url: string;
//     thumbnailUrl: string;
// }


const ClubListPage = () => {
    // 공지사항 상태 관리
    // const [announcements, setAnnouncements] = useState<Announcement[]>([]);
    // const [currentIndex, setCurrentIndex] = useState(0);
    const navigate = useNavigate();
    
    // 각각의 드롭다운을 위한 별도의 상태 관리
    const [categoryFilter, setCategoryFilter] = useState<string>('none'); // 분과 필터 상태
    const [recruitmentStatus, setRecruitmentStatus] = useState<string>('none'); // 모집상태 필터 상태
    const [sortOrder, setSortOrder] = useState<string>('none'); // 정렬 기준 필터 상태
    // 검색 기능을 위한 상태 관리
    const [searchTerm, setSearchTerm] = useState<string>(''); // 검색어 상태
    const [clubs, setClubs] = useState<Club[]>([]); // 초기값을 빈 배열로 변경
    const [isLoading, setIsLoading] = useState(false); // 로딩 상태

    // 설문조사 모달 상태
    const [isSurveyModalOpen, setIsSurveyModalOpen] = useState(false);

    // 공지사항 불러오기
    // useEffect(() => {
    //     const fetchAnnouncements = async () => {
    //         try {
    //             const response = await apiRequest({
    //                 url: '/api/announcements',
    //             });

    //             if (response?.result?.announcementDTOList) {
    //                 // 최대 5개까지만 설정
    //                 setAnnouncements(
    //                     response.result.announcementDTOList.slice(0, 5),
    //                 );
    //             }
    //         } catch (error) {
    //             console.error('공지사항을 불러오는데 실패했습니다:', error);
    //         }
    //     };

    //     fetchAnnouncements();
    // }, []);

    // // 이전 이미지 버튼 클릭 시 실행되는 함수
    // const handlePrev = () => {
    //     setCurrentIndex((prev) =>
    //         prev === 0 ? announcements.length - 1 : prev - 1,
    //     );
    // };

    // // 다음 이미지 버튼 클릭 시 실행되는 함수
    // const handleNext = () => {
    //     setCurrentIndex((prev) =>
    //         prev === announcements.length - 1 ? 0 : prev + 1,
    //     );
    // };

    // 현재 표시할 이미지 아이템 배열 반환
    // const getDisplayItems = () => {
    //     const prevIndex =
    //         currentIndex === 0 ? announcements.length - 1 : currentIndex - 1;
    //     const nextIndex =
    //         currentIndex === announcements.length - 1 ? 0 : currentIndex + 1;

    //     return [
    //         announcements[prevIndex],
    //         announcements[currentIndex],
    //         announcements[nextIndex],
    //     ];
    // };

    // // 현재 표시할 이미지 아이템 배열 반환
    // const displayItems = getDisplayItems();

    // useCallback을 사용하여 fetchClubs 함수를 메모이제이션
    const fetchClubs = useCallback(async () => {
        try {
            setIsLoading(true); // 로딩 상태 설정
            const params: Record<string, string> = {
                size: '100',  // 충분히 큰 수로 설정하여 모든 데이터를 가져옴
                page: '0'
            };

            // 필터링 조건만 쿼리 파라미터로 전달
            if (searchTerm.trim()) {
                params.keyword = searchTerm.trim();
            }
            // 분과 필터링 조건 추가
            if (categoryFilter !== 'none') {
                params.category = categoryFilter.toUpperCase();
            }
            // 모집상태 필터링 조건 추가
            if (recruitmentStatus !== 'none') {
                params.status = recruitmentStatus.toUpperCase();
            }

            const queryString = new URLSearchParams(params).toString(); // 쿼리 파라미터 문자열로 변환
            const url = `/api/clubs${queryString ? `?${queryString}` : ''}`; // 쿼리 파라미터가 있으면 쿼리 파라미터를 추가

            // 동아리 목록 조회 API 호출
            const response = (await apiRequest({
                url,
                method: 'GET',
            })) as ApiResponse;

            // 동아리 목록 조회 API 응답 처리
            if (response?.result?.clubs) {
                const sortedClubs = [...response.result.clubs];

                // 프론트엔드에서 정렬 처리
                if (sortOrder === 'category') {
                    // 카테고리로 정렬
                    sortedClubs.sort((a, b) =>
                        getCategoryMapping(a.category).localeCompare(
                            getCategoryMapping(b.category),
                        ),
                    );
                } else if (sortOrder === 'recruitment') {
                    // 모집상태로 정렬
                    sortedClubs.sort(
                        (a, b) =>
                            getRecruitmentStatusOrder(a.recruitmentStatus) -
                            getRecruitmentStatusOrder(b.recruitmentStatus),
                    );
                } else {
                    // 가나다순 정렬 (기본값)
                    sortedClubs.sort((a, b) => a.name.localeCompare(b.name));
                }
                setClubs(sortedClubs);
            }
        } catch (error) {
            console.error('동아리 목록 조회 실패:', error);
            setClubs([]);
        } finally {
            setIsLoading(false); // 로딩 상태 해제
        }
    }, [searchTerm, categoryFilter, recruitmentStatus, sortOrder]);

    // useEffect에 fetchClubs 추가
    useEffect(() => {
        fetchClubs();
    }, [fetchClubs]);

    // 검색 버튼 클릭 핸들러
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

    // 카테고리 매핑 함수
    const getCategoryMapping = (category: string) => {
        const categoryMap: { [key: string]: string } = {
            SPORTS: '체육분과',
            ART: '예술분과',
            VOLUNTEER: '봉사분과',
            ACADEMIC: '학술교양분과',
            RELIGION: '종교분과',
            UNION: '연합동아리',
        };
        return categoryMap[category] || category;
    };

    // 모집상태 매핑 함수
    const getRecruitmentStatusMapping = (status: string) => {
        const statusMap: { [key: string]: string } = {
            UPCOMING: '모집예정',
            OPEN: '모집중',
            CLOSED: '모집마감',
        };
        return statusMap[status] || status;
    };

    const getRecruitmentStatusOrder = (status: string) => {
        const statusOrder: { [key: string]: number } = {
            OPEN: 1, // 모집중
            UPCOMING: 2, // 모집예정
            CLOSED: 3, // 모집마감
        };
        return statusOrder[status] || 999;
    };

    // 동아리 상세 페이지로 이동
    const handleCardClick = (clubId: number) => {
        navigate(`/club/${clubId}`);
    };

    // 설문조사 모달 토글
    const toggleSurveyModal = () => {
        setIsSurveyModalOpen(!isSurveyModalOpen);
    };

    // 설문조사 모달 피드백 제출
    const handleFeedbackSubmit = async (text: string) => {
        try {
            await apiRequest({
                url: '/api/feedbacks',
                method: 'POST',
                data: {
                    content: text
                }
            });
            console.log('피드백이 성공적으로 제출되었습니다! 🎉');
            // 성공적으로 제출되면 모달을 닫습니다
            setIsSurveyModalOpen(false);
        } catch (error) {
            console.error('피드백 제출 실패:', error);
        }
    };

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

                <SurveyBoxContainer>
                    <SurveyButton onClick={toggleSurveyModal}>
                        <SurveyBox />
                        <SurveyCardArrow />
                    </SurveyButton>
                    <Modal 
                        isOpen={isSurveyModalOpen} 
                        toggle={toggleSurveyModal}
                        title="이용경험을 공유해 주세요."
                        subtitle="오류, 건의사항, 칭찬 등 모두 환영입니다 :)"
                        type="feedback"
                        onSubmit={handleFeedbackSubmit}
                    />
                </SurveyBoxContainer>

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
                                    { label: '학술교양분과', value: 'academic' },
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
                        ) : clubs && clubs.length > 0 ? (
                            clubs.map((club) => {
                                const mappedCategory = getCategoryMapping(
                                    club.category,
                                );
                                const mappedStatus = getRecruitmentStatusMapping(
                                    club.recruitmentStatus,
                                );
                                return (
                                    <MainpageCard
                                        key={club.id}
                                        title={club.name}
                                        subtitle={club.description}
                                        tags={[
                                            {
                                                type: '동아리 및 질문',
                                                text: `${getCategoryEmoji(
                                                    mappedCategory,
                                                )} ${mappedCategory}`,
                                            },
                                            {
                                                type: mappedStatus as TagType,
                                                text: mappedStatus,
                                            },
                                        ]}
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
