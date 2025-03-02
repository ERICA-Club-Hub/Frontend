import Card from '../Common/Card';
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { apiRequest } from '../../api/apiRequest';
import Button from '../Common/Button';
import { Link, useNavigate } from 'react-router-dom';

const Container = styled.div<{ $mode: string }>`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: ${({ $mode }) => ($mode === 'register' ? '15px' : '19px')};
    padding-top: 20px;
`;

const TitleWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    width: 320px;
`;

const Title = styled.div`
    font-size: 16px;
    font-weight: 600;
    line-height: normal;
    color: #{({ theme }) => theme.colors.mainBlack};
`;

const Body = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
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
    thumbnailUrl: string;
}

function UnionNoticeList({ mode }: { mode: string }) {
    const navigate = useNavigate();
    const [announcements, setAnnouncements] = useState<AnnouncementDTOList>({
        announcementDTOList: [],
    });
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchAnnouncements = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await apiRequest({
                    url: '/api/announcements',
                });

                console.log('API 응답:', response);

                if (!response?.result) {
                    throw new Error('데이터를 불러오는데 실패했습니다.');
                }

                setAnnouncements(response.result);
            } catch (error) {
                console.error('공지사항을 불러오는데 실패했습니다:', error);
                setError(
                    '공지사항을 불러오는데 실패했습니다. 다시 시도해 주세요.',
                );
            } finally {
                setIsLoading(false);
            }
        };

        fetchAnnouncements();
    }, []);

    // 카드 클릭 시 이동
    const handleCardClick = (id: number, url: string) => {
        if (mode === 'register') {
            // 어드민 등록 모드일 때 해당 총동연 공지사항 수정 페이지로 이동
            navigate(`/admin/union/notice/${id}/register`, {
                state: { announcementId: id },
            });
        } else {
            // 읽기 모드일 때 클릭 시 해당 URL로 이동
            window.location.href = url;
        }
    };

    return (
        <Container $mode={mode}>
            <TitleWrapper>
                <Title>총동연 공지사항</Title>
                {mode === 'register' && (
                    <Link to="/admin/union/notice/register">
                        <Button disabled={false}>공지사항 작성하기</Button>
                    </Link>
                )}
            </TitleWrapper>
            <Body>
                {isLoading ? (
                    <div>로딩중...</div>
                ) : error ? (
                    <div>{error}</div>
                ) : announcements?.announcementDTOList?.length > 0 ? (
                    announcements.announcementDTOList.map((announcement) => (
                        <CardWrapper
                            key={announcement.announcementId}
                            onClick={() =>
                                handleCardClick(
                                    announcement.announcementId,
                                    announcement.url,
                                )
                            }
                        >
                            <Card
                                $variant="unionNotice"
                                $imagePath={announcement.thumbnailUrl}
                                title={announcement.title}
                                date={announcement.date}
                            />
                        </CardWrapper>
                    ))
                ) : (
                    <div>등록된 공지사항이 없습니다.</div>
                )}
            </Body>
        </Container>
    );
}

export { UnionNoticeList };
