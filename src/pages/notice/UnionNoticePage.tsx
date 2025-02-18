import Card from '../../components/Common/Card';
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { apiRequest } from '../../api/apiRequest';

const Title = styled.div`
    color: #232323;
    font-family: Pretendard;
    font-size: 16px;
    font-weight: 600;
    line-height: normal;
    margin: 20px;
`;

const Body = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin: 20px;
`;

const CardWrapper = styled.div`
    cursor: pointer;
    &:hover {
        opacity: 0.8;
    }
`;

interface AnnouncementDTOList {
    announcementDTOList: AnnouncementDTO[];
}

interface AnnouncementDTO {
    announcementId: number;
    title: string;
    date: string;
    url: string;
    thumbnail: string;
}

const UnionNoticePage = () => {
    const [announcements, setAnnouncements] = useState<AnnouncementDTOList>({
        announcementDTOList: [],
    }); // 공지사항 목록
    const [isLoading, setIsLoading] = useState(true); // 로딩 상태

    useEffect(() => {
        const fetchAnnouncements = async () => {
            try {
                setIsLoading(true);
                const response = await apiRequest({
                    url: '/api/announcements',
                });

                console.log('API 응답:', response);

                setAnnouncements(response.result);
            } catch (error) {
                console.error('공지사항을 불러오는데 실패했습니다:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchAnnouncements();
    }, []);

    // 카드 클릭 시 이동
    const handleCardClick = (url: string) => {
        window.location.href = url; // 현재 페이지에서 URL로 이동
    };

    // 로딩 중일 때 로딩 표시
    if (isLoading) {
        return <div>로딩중...</div>;
    }

    return (
        <div>
            <Title>총동연 공지사항</Title>
            <Body>
                {announcements?.announcementDTOList?.map((announcement) => (
                    <CardWrapper
                        key={announcement.announcementId}
                        onClick={() => handleCardClick(announcement.url)}
                    >
                        <Card
                            $variant="unionNotice"
                            imagePath={announcement.thumbnail}
                            title={announcement.title}
                            date={announcement.date}
                        />
                    </CardWrapper>
                ))}
            </Body>
        </div>
    );
};

export { UnionNoticePage };
