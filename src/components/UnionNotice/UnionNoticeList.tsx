import Card from '../Common/Card';
import styled from 'styled-components';
import { useState } from 'react';
import Button from '../Common/Button';
import { Link, useNavigate } from 'react-router-dom';
import useUnionQueries from '@/hooks/queries/useUnionQueries';

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
    color: ${({ theme }) => theme.colors.mainBlack};
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

export interface AnnouncementDTOList {
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

    // 총동연 공지사항 목록 불러오기
    const { useUnionNoticeListQuery } = useUnionQueries();
    // 로딩, 에러 상태
    const { isPending, isError } = useUnionNoticeListQuery({
        setAnnouncements,
    });

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
                {isPending ? (
                    <div>로딩중...</div>
                ) : isError ? (
                    <div>{isError}</div>
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
