import Card from '@/components/Common/Card';
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { apiRequest } from '@/api/apiRequest';

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
`;

const ContentWrapper = styled.div`
    width: 320px;
    display: flex;
    flex-direction: column;
`;

const Title = styled.div`
    color: #232323;
    font-family: "Pretendard";
    font-size: 16px;
    font-weight: 600;
    line-height: normal;
    margin: 20px 0px;
`;

const Body = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: flex-start;
`;

const CardContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    padding-bottom: 8px;
`;

const ContentBox = styled.div<{ $isVisible: boolean }>`
    max-height: ${(props) => (props.$isVisible ? '200px' : '0')};
    width: 100%;
    flex-shrink: 0;
    border-radius: 10px;
    border: 1px solid var(--Gray-4, #f7f7f7);
    background: #fff;
    overflow: hidden;
    transition: max-height 0.3s ease-in-out;
`;

const ContentText = styled.div`
    width: 100%;
    color: var(--Gray-1, #606060);
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 18px;
    padding: 20px;
    white-space: pre-line;
`;

interface NoticeItem {
    id: number;
    title: string;
    content: string;
    createdAt: string;
}

const ServiceNoticePage = () => {
    const [rotatedStates, setRotatedStates] = useState<{
        [key: number]: boolean;
    }>({}); // 회전 상태
    const [noticeItems, setNoticeItems] = useState<NoticeItem[]>([]); // 공지사항 목록
    const [page, setPage] = useState<number>(0); // 페이지 번호
    const [size] = useState<number>(10); // 한 번에 불러오는 공지사항 수
    const [hasMore, setHasMore] = useState<boolean>(true); // 더 불러올 데이터가 있는지 여부
    const [isLoading, setIsLoading] = useState<boolean>(false); // 로딩 상태
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchNotices = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await apiRequest({
                    url: `/api/service-announcements?page=${page}&size=${size}`,
                });

                // 날짜 형식 변환 및 필드 매핑
                const notices =
                    response?.result?.serviceAnnouncements.map(
                        (item: NoticeItem) => ({
                            ...item,
                            createdAt: new Date(item.createdAt)
                                .toLocaleDateString('ko-KR', {
                                    year: 'numeric',
                                    month: '2-digit',
                                    day: '2-digit',
                                })
                                .replace(/\. /g, '.')
                                .replace(/\.$/, ''),
                        }),
                    ) || [];

                if (page === 0) {
                    setNoticeItems(notices);
                } else {
                    setNoticeItems((prev) => [...prev, ...notices]);
                }

                // totalElements를 통해 더 불러올 데이터가 있는지 확인
                const totalElements = response?.result?.totalElements || 0;
                setHasMore((page + 1) * size < totalElements);
            } catch (error) {
                console.error('공지사항 불러오기 실패:', error);
                setError(
                    '공지사항을 불러오는데 실패했습니다. 다시 시도해 주세요.',
                );
                setHasMore(false);
            } finally {
                setIsLoading(false);
            }
        };

        fetchNotices();
    }, [page, size]);

    const loadMore = () => {
        if (hasMore) {
            setPage((prev) => prev + 1);
        }
    };

    const handleCardClick = (index: number) => {
        setRotatedStates((prev) => ({
            ...prev,
            [index]: !prev[index],
        }));
    };

    return (
        <PageContainer>
            <ContentWrapper>
                <Title>서비스 공지사항</Title>
                <Body>
                    {isLoading && page === 0 ? (
                        <div>로딩 중...</div>
                    ) : error ? (
                        <div>{error}</div>
                    ) : noticeItems.length > 0 ? (
                        <>
                            {noticeItems.map((item, index) => (
                                <CardContainer key={index}>
                                    <Card
                                        $variant="serviceNotice"
                                        title={item.title}
                                        date={item.createdAt}
                                        isRotated={rotatedStates[index]}
                                        onClick={() => handleCardClick(index)}
                                    />
                                    <ContentBox $isVisible={rotatedStates[index]}>
                                        <ContentText>{item.content}</ContentText>
                                    </ContentBox>
                                </CardContainer>
                            ))}
                            {hasMore && !isLoading && (
                                <button onClick={loadMore}>더 보기</button>
                            )}
                            {isLoading && <div>로딩 중...</div>}
                        </>
                    ) : (
                        <div>등록된 공지사항이 없습니다.</div>
                    )}
                </Body>
            </ContentWrapper>
        </PageContainer>
    );
};

export { ServiceNoticePage };
