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


const MainAnnouncement = styled.button<{ imageUrl: string }>`
    position: relative;
    width: 200px;
    height: 200px;
    flex-shrink: 0;
    border-radius: 10px;
    background: ${props => `url(${props.imageUrl})`} lightgray 50% / cover no-repeat;
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

const StatusDot = styled.div<{ active: boolean }>`
    width: ${props => props.active ? '10px' : '4px'};
    height: 4px;
    border-radius: 2px;
    background-color: ${props => props.active ? '#33639C' : '#DAEBFF'};
    transition: all 0.3s ease;
`;

const SubAnnouncement = styled.button<{ imageUrl: string }>`
    width: 200px;
    height: 200px;
    flex-shrink: 0;
    border-radius: 10px;
    background: ${props => `linear-gradient(0deg, rgba(0, 0, 0, 0.40) 0%, rgba(0, 0, 0, 0.40) 100%), 
                url(${props.imageUrl})`} lightgray 50% / cover no-repeat;
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
    const [categoryFilter, setCategoryFilter] = useState<string>('none');
    const [recruitmentStatus, setRecruitmentStatus] = useState<string>('none');
    const [sortOrder, setSortOrder] = useState<string>('none');

    const handlePrev = () => {
        setCurrentIndex((prev) => 
            prev === 0 ? announcements.length - 1 : prev - 1
        );
    };

    const handleNext = () => {
        setCurrentIndex((prev) => 
            prev === announcements.length - 1 ? 0 : prev + 1
        );
    };

    const getDisplayItems = () => {
        const prevIndex = currentIndex === 0 ? announcements.length - 1 : currentIndex - 1;
        const nextIndex = currentIndex === announcements.length - 1 ? 0 : currentIndex + 1;

        return [
            announcements[prevIndex],
            announcements[currentIndex],
            announcements[nextIndex],
        ];
    };

    const displayItems = getDisplayItems();

    const handleSearch = () => {
        console.log('검색 버튼 클릭됨');
    };

    const handleCategorySelect = (value: string) => {
        setCategoryFilter(value);
        console.log('분과 선택:', value);
    };

    const handleRecruitmentStatusSelect = (value: string) => {
        setRecruitmentStatus(value);
        console.log('모집상태 선택:', value);
    };

    const handleSort = (value: string) => {
        setSortOrder(value);
        console.log('정렬 기준 선택:', value);
    };

    return (
        <div>
            <AnnouncementContainer>
                <ArrowButton onClick={handlePrev}>
                    <img src="/src/assets/common/main_prev_arrow.svg" alt="이전" />
                </ArrowButton>
                <SubAnnouncement 
                    imageUrl={displayItems[0].imageUrl} 
                    data-index={displayItems[0].id} 
                />
                <MainAnnouncement 
                    imageUrl={displayItems[1].imageUrl} 
                    data-index={displayItems[1].id}
                >
                    <StatusIndicator>
                        {announcements.map((_, index) => (
                            <StatusDot 
                                key={index} 
                                active={index === currentIndex} 
                            />
                        ))}
                    </StatusIndicator>
                </MainAnnouncement>
                <SubAnnouncement 
                    imageUrl={displayItems[2].imageUrl} 
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
                    <MainpageCard 
                        title="UMC ERICA"
                        subtitle="대학생 IT 개발 연합동아리"
                        tags={[
                            { type: '동아리 및 질문', text: '🧩 연합동아리' },
                            { type: '모집중', text: '모집중' },
                        ]}
                        onClick={() => console.log('카드 클릭')}
                    />
                    <MainpageCard 
                        title="소나기"
                        subtitle="영화 감상, 제작 동아리"
                        tags={[
                            { type: '동아리 및 질문', text: '🎨 예술분과' },
                            { type: '모집마감', text: '모집마감' },
                        ]}
                        onClick={() => console.log('카드 클릭')}
                    />
                    <MainpageCard 
                        title="로타랙트"
                        subtitle="흥청봉사 로타렉트!"
                        tags={[
                            { type: '동아리 및 질문', text: '💌 봉사분과' },
                            { type: '모집예정', text: '모집예정' },
                        ]}
                        onClick={() => console.log('카드 클릭')}
                    />
                    <MainpageCard   
                        title="CRACKER"
                        subtitle="공모전 성과와 친목을 만들 수 있는 동아리"
                        tags={[
                            { type: '동아리 및 질문', text: '🎓 학술교양분과' },
                            { type: '모집중', text: '모집중' },
                        ]}
                        onClick={() => console.log('카드 클릭')}
                    />
                    {/* 더 많은 MainpageCard를 추가할 수 있습니다 */}
                </ClubListWrapper>
            </ClubSearchContainer>
        </div>
    );
};

export { ClubListPage };
