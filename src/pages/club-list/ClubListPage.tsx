import styled from 'styled-components';
import { useState, useEffect, useCallback } from 'react';
import { InputField } from '../../components/Common/InputField';
import MainpageCard from '../../components/Common/MainpageCard';
import SortingDropdown from '../../components/Common/SortingDropdown';
import { apiRequest } from '../../api/apiRequest';

const AnnouncementContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 25vh;
    gap: 10px;
    overflow: hidden;
    position: relative;
`;


const MainAnnouncement = styled.button<{ $imageUrl: string }>`
    position: relative;
    width: 200px;
    height: 200px;
    flex-shrink: 0;
    border-radius: 10px;
    background: ${props => `url(${props.$imageUrl})`} lightgray 50% / cover no-repeat;
    border: none;
    cursor: pointer;
`;

const StatusIndicator = styled.div`
    position: absolute;
    bottom: -20px;
    left: 50%;
    transform: translateX(-50%);
    width: 42px;
    height: 8px;
    flex-shrink: 0;
    background: white;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 3px;
`;

const StatusDot = styled.div<{ $active: boolean }>`
    width: ${props => props.$active ? '10px' : '4px'};
    height: 4px;
    border-radius: 2px;
    background-color: ${props => props.$active ? '#33639C' : '#DAEBFF'};
    transition: all 0.3s ease;
`;

const SubAnnouncement = styled.button<{ $imageUrl: string }>`
    width: 200px;
    height: 200px;
    flex-shrink: 0;
    border-radius: 10px;
    background: ${props => `linear-gradient(0deg, rgba(0, 0, 0, 0.40) 0%, rgba(0, 0, 0, 0.40) 100%), 
                url(${props.$imageUrl})`} lightgray 50% / cover no-repeat;
    border: none;
    cursor: pointer;
`;

const ArrowButton = styled.button`
    width: 22px;
    height: 22px;
    flex-shrink: 0;
    border: none;
    background: none;
    cursor: pointer;
    padding: 0;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 1;
    
    &:first-child {
        left: 50%;
        transform: translateX(-150px) translateY(-50%);
    }
    
    &:last-child {
        right: 50%;
        transform: translateX(150px) translateY(-50%);
    }  
`;

const ClubSearchContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 36px 0;
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

const ClubListPage = () => {
    const announcements = [
        { id: 1, imageUrl: '/src/assets/common/dummy-image.png' },
        { id: 2, imageUrl: '/src/assets/common/dummy-image.png' },
        { id: 3, imageUrl: '/src/assets/common/dummy-image.png' },
        { id: 4, imageUrl: '/src/assets/common/dummy-image.png' },
        { id: 5, imageUrl: '/src/assets/common/dummy-image.png' },
    ];

    const [currentIndex, setCurrentIndex] = useState(0); // 현재 이미지 인덱스

    // 각각의 드롭다운을 위한 별도의 상태 관리
    const [categoryFilter, setCategoryFilter] = useState<string>('none'); // 분과 필터 상태
    const [recruitmentStatus, setRecruitmentStatus] = useState<string>('none'); // 모집상태 필터 상태
    const [sortOrder, setSortOrder] = useState<string>('none'); // 정렬 기준 필터 상태

    // 검색 기능을 위한 상태 관리
    const [searchTerm, setSearchTerm] = useState<string>(''); // 검색어 상태
    const [clubs, setClubs] = useState<Club[]>([]); // 초기값을 빈 배열로 변경
    const [isLoading, setIsLoading] = useState(false); // 로딩 상태

    // 이전 이미지 버튼 클릭 시 실행되는 함수
    const handlePrev = () => {
        setCurrentIndex((prev) => 
            prev === 0 ? announcements.length - 1 : prev - 1
        );
    };

    // 다음 이미지 버튼 클릭 시 실행되는 함수
    const handleNext = () => {
        setCurrentIndex((prev) => 
            prev === announcements.length - 1 ? 0 : prev + 1
        );
    };

    // 현재 표시할 이미지 아이템 배열 반환
    const getDisplayItems = () => {
        const prevIndex = currentIndex === 0 ? announcements.length - 1 : currentIndex - 1;
        const nextIndex = currentIndex === announcements.length - 1 ? 0 : currentIndex + 1;

        return [
            announcements[prevIndex],
            announcements[currentIndex],
            announcements[nextIndex],
        ];
    };

    // 현재 표시할 이미지 아이템 배열 반환
    const displayItems = getDisplayItems();

    // useCallback을 사용하여 fetchClubs 함수를 메모이제이션
    const fetchClubs = useCallback(async () => {
        try {
            setIsLoading(true); // 로딩 상태 설정
            const params: Record<string, string> = {}; // 쿼리 파라미터 초기화
            
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
            const response = await apiRequest({
                url,
                method: 'GET'
            }) as ApiResponse;

            // 동아리 목록 조회 API 응답 처리
            if (response?.result?.clubs) {
                const sortedClubs = [...response.result.clubs];
                
                // 프론트엔드에서 정렬 처리
                if (sortOrder === 'category') { // 카테고리로 정렬
                    sortedClubs.sort((a, b) => 
                        getCategoryMapping(a.category).localeCompare(getCategoryMapping(b.category))
                    );
                } else if (sortOrder === 'recruitment') { // 모집상태로 정렬
                    sortedClubs.sort((a, b) => 
                        getRecruitmentStatusMapping(a.recruitmentStatus)
                            .localeCompare(getRecruitmentStatusMapping(b.recruitmentStatus))
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
    }, [fetchClubs]); // fetchClubs만 의존성으로 설정

    // 검색 버튼 클릭 핸들러 - 이미 useEffect에서 searchTerm 변경을 감지하므로 제거
    const handleSearch = () => {
        // 엔터나 검색 버튼 클릭 시에도 searchTerm이 변경되어 자동으로 fetchClubs가 호출됨
    };

    // 카테고리별 이모지 매핑 함수
    const getCategoryEmoji = (category: string) => {
        const emojiMap: { [key: string]: string } = {
            '연합동아리': '🧩',
            '예술분과': '🎨',
            '봉사분과': '💌',
            '학술교양분과': '🎓',
            '체육분과': '⚽',
            '종교분과': '🙏'
            };
        return emojiMap[category] || '📌';
    };

    // 분과 선택 시 실행되는 함수
    const handleCategorySelect = (value: string) => {
        setCategoryFilter(value);
        console.log('분과 선택:', value);
    };

    // 모집상태 선택 시 실행되는 함수
    const handleRecruitmentStatusSelect = (value: string) => {
        setRecruitmentStatus(value);
        console.log('모집상태 선택:', value);
    };

    // 정렬 기준 선택 시 실행되는 함수
    const handleSort = (value: string) => {
        setSortOrder(value);
        console.log('정렬 기준 선택:', value);
    };

    // 카테고리 매핑 함수
    const getCategoryMapping = (category: string) => {
        const categoryMap: { [key: string]: string } = {
            'SPORTS': '체육분과',
            'ART': '예술분과',
            'VOLUNTEER': '봉사분과',
            'ACADEMIC': '학술교양분과',
            'RELIGION': '종교분과',
            'UNION': '연합동아리'
        };
        return categoryMap[category] || category;
    };

    // 모집상태 매핑 함수   
    const getRecruitmentStatusMapping = (status: string) => {
        const statusMap: { [key: string]: string } = {
            'UPCOMING': '모집예정',
            'OPEN': '모집중',
            'CLOSED': '모집마감'
        };
        return statusMap[status] || status;
    };

    return (
        <div>
            <AnnouncementContainer>
                <ArrowButton onClick={handlePrev}>
                    <img src="/src/assets/common/main_prev_arrow.svg" alt="이전" />
                </ArrowButton>
                <SubAnnouncement 
                    $imageUrl={displayItems[0].imageUrl} 
                    data-index={displayItems[0].id} 
                />
                <MainAnnouncement 
                    $imageUrl={displayItems[1].imageUrl} 
                    data-index={displayItems[1].id}
                >
                    <StatusIndicator>
                        {announcements.map((_, index) => (
                            <StatusDot 
                                key={index} 
                                $active={index === currentIndex} 
                            />
                        ))}
                    </StatusIndicator>
                </MainAnnouncement>
                <SubAnnouncement 
                    $imageUrl={displayItems[2].imageUrl} 
                    data-index={displayItems[2].id} 
                />
                <ArrowButton onClick={handleNext}>
                    <img src="/src/assets/common/main_next_arrow.svg" alt="다음" />
                </ArrowButton>
            </AnnouncementContainer>
            
            <ClubSearchContainer>
                <SearchInputWrapper>
                    <InputField 
                        inputSize="large"
                        placeholder="원하는 동아리를 검색해 보세요."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <SearchIcon onClick={handleSearch}>
                        <img 
                            src="/src/assets/common/reading_glass.svg" 
                            alt="검색"
                        />
                    </SearchIcon>
                </SearchInputWrapper>

                <DropdownContainer>
                    <SortingDropdown 
                        key="sort-dropdown"
                        options={[
                            { label: '가나다순으로 정렬', value: 'none' },
                            { label: '카테고리로 정렬', value: 'category' },
                            { label: '모집기준으로 정렬', value: 'recruitment' }
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
                                { label: '모집마감', value: 'closed' }
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
                        clubs.map(club => {
                            const mappedCategory = getCategoryMapping(club.category);
                            const mappedStatus = getRecruitmentStatusMapping(club.recruitmentStatus);
                            return (
                                <MainpageCard 
                                    key={club.id}
                                    title={club.name}
                                    subtitle={club.description}
                                    tags={[
                                        { 
                                            type: '동아리 및 질문', 
                                            text: `${getCategoryEmoji(mappedCategory)} ${mappedCategory}` 
                                        },
                                        { 
                                            type: mappedStatus as TagType, 
                                            text: mappedStatus 
                                        },
                                    ]}
                                    onClick={() => console.log('카드 클릭')}
                                />
                            );
                        })
                    ) : (
                        <div>검색 결과가 없습니다.</div>
                    )}
                </ClubListWrapper>
            </ClubSearchContainer>
        </div>
    );
};

export { ClubListPage };
