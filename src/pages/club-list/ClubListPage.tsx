import styled from 'styled-components';
import { useState } from 'react';
import { InputField } from '../../components/Common/InputField';
import MainpageCard from '../../components/Common/MainpageCard';
import SortingDropdown from '../../components/Common/SortingDropdown';

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

const ClubListPage = () => {
    const announcements = [
        { id: 1, imageUrl: '/src/assets/common/dummy-image.png' },
        { id: 2, imageUrl: '/src/assets/common/dummy-image.png' },
        { id: 3, imageUrl: '/src/assets/common/dummy-image.png' },
        { id: 4, imageUrl: '/src/assets/common/dummy-image.png' },
        { id: 5, imageUrl: '/src/assets/common/dummy-image.png' },
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    // 각각의 드롭다운을 위한 별도의 상태 관리
    const [categoryFilter, setCategoryFilter] = useState<string>('none'); // 분과 필터 상태
    const [recruitmentStatus, setRecruitmentStatus] = useState<string>('none'); // 모집상태 필터 상태
    const [sortOrder, setSortOrder] = useState<string>('none'); // 정렬 기준 필터 상태

    // 검색 기능을 위한 상태 관리
    const [searchTerm, setSearchTerm] = useState<string>(''); // 검색어 상태
    const [clubs] = useState([ // 동아리 데이터
        {
            id: 1,
            title: "UMC ERICA",
            subtitle: "대학생 IT 개발 연합동아리",
            category: "연합동아리",
            status: "모집중"
        },
        {
            id: 2,
            title: "소나기",
            subtitle: "영화 감상, 제작 동아리",
            category: "예술분과",
            status: "모집마감"
        },
        {
            id: 3,
            title: "로타랙트",
            subtitle: "흥청봉사 로타렉트!",
            category: "봉사분과",
            status: "모집예정"
        },
        {
            id: 4,
            title: "CRACKER",
            subtitle: "공모전 성과와 친목을 만들 수 있는 동아리",
            category: "학술교양분과",
            status: "모집중"
        },
        // ... 더 많은 클럽 데이터 추가 가능
    ]);

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

    // 검색 버튼 클릭 시 실행되는 함수
    const handleSearch = () => {
        // 검색어가 비어있으면 전체 결과 표시
        if (!searchTerm.trim()) return clubs;

        // 검색어가 포함된 동아리만 필터링
        return clubs.filter(club => 
            club.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            club.subtitle.toLowerCase().includes(searchTerm.toLowerCase())
        );
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

    // 필터링된 클럽 목록을 반환하는 함수
    const getFilteredClubs = () => {
        // 1. 먼저 검색어로 필터링
        let filtered = handleSearch();

        // 2. 분과 필터 적용
        if (categoryFilter !== 'none') {
            filtered = filtered.filter(club => {
                switch (categoryFilter) {
                    case 'volunteer':
                        return club.category === '봉사분과';
                    case 'art':
                        return club.category === '예술분과';
                    case 'religion':
                        return club.category === '종교분과';
                    case 'sports':
                        return club.category === '체육분과';
                    case 'academic':
                        return club.category === '학술교양분과';
                    case 'union':
                        return club.category === '연합동아리';
                    default:
                        return true;
                }
            });
        }

        // 3. 모집상태 필터 적용
        if (recruitmentStatus !== 'none') {
            filtered = filtered.filter(club => {
                switch (recruitmentStatus) {
                    case 'upcoming':
                        return club.status === '모집예정';
                    case 'recruiting':
                        return club.status === '모집중';
                    case 'closed':
                        return club.status === '모집마감';
                    default:
                        return true;
                }
            });
        }

        // 4. 정렬 적용
        if (sortOrder === 'none' || sortOrder === 'category' || sortOrder === 'recruitment') {
            // 모집상태 정렬을 위한 순서 매핑
            const statusOrder: { [key: string]: number } = {
                '모집중': 0,
                '모집예정': 1,
                '모집마감': 2
            };

            filtered.sort((a, b) => {
                switch (sortOrder) {
                    case 'category':
                        // 카테고리 내에서 가나다순 정렬
                        if (a.category === b.category) {
                            return a.title.localeCompare(b.title, ['ko', 'en']);
                        }
                        return a.category.localeCompare(b.category, ['ko', 'en']);
                        
                    case 'recruitment':
                        // 모집상태 순서에 따라 정렬
                        if (statusOrder[a.status] === statusOrder[b.status]) {
                            return a.title.localeCompare(b.title, ['ko', 'en']);
                        }
                        return statusOrder[a.status] - statusOrder[b.status];
                        
                    default:
                        // 기본적으로 가나다순 정렬 (한글, 영어 모두)
                        return a.title.localeCompare(b.title, ['ko', 'en']);
                }
            });
        }

        return filtered;
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
                                { label: '모집중', value: 'recruiting' },
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
                    {getFilteredClubs().map(club => {
                        // club.status의 타입을 TagType으로 타입 단언
                        const status = club.status as TagType;
                        
                        return (
                            <MainpageCard 
                                key={club.id}
                                title={club.title}
                                subtitle={club.subtitle}
                                tags={[
                                    { 
                                        type: '동아리 및 질문', 
                                        text: `${getCategoryEmoji(club.category)} ${club.category}` 
                                    },
                                    { 
                                        type: status, 
                                        text: club.status 
                                    },
                                ]}
                                onClick={() => console.log('카드 클릭')}
                            />
                        );
                    })}
                </ClubListWrapper>
            </ClubSearchContainer>
        </div>
    );
};

export { ClubListPage };
