import styled from 'styled-components';
import { useState } from 'react';

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 25vh;
    overflow: hidden;
    position: relative;
`;

const AnnouncementContainer = styled.div`
    display: flex;
    align-items: center;
    position: relative;
    gap: 10px;
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


const ClubListPage = () => {
    const announcements = [
        { id: 1, imageUrl: '/src/assets/common/dummy-image.png' },
        { id: 2, imageUrl: '/src/assets/common/dummy-image.png' },
        { id: 3, imageUrl: '/src/assets/common/dummy-image.png' },
        { id: 4, imageUrl: '/src/assets/common/dummy-image.png' },
        { id: 5, imageUrl: '/src/assets/common/dummy-image.png' },
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

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

    return (
        <Container>
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
        </Container>
    );
};

export { ClubListPage };
