import Card from '@/components/Common/Card';
import { useState, useEffect } from 'react';
import { apiRequest } from '@/api/apiRequest';

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
        <div className="flex flex-col items-center w-full">
            <div className="w-[320px] flex flex-col">
                <div className="text-body-01 font-semibold text-black my-5">
                    서비스 공지사항
                </div>
                <div className="flex flex-col w-full items-start">
                    {isLoading && page === 0 ? (
                        <div>로딩 중...</div>
                    ) : error ? (
                        <div>{error}</div>
                    ) : noticeItems.length > 0 ? (
                        <>
                            {noticeItems.map((item, index) => (
                                <div
                                    key={index}
                                    className="flex flex-col w-full pb-2"
                                >
                                    <Card
                                        $variant="serviceNotice"
                                        title={item.title}
                                        date={item.createdAt}
                                        isRotated={rotatedStates[index]}
                                        onClick={() => handleCardClick(index)}
                                    />
                                    <div
                                        className={`w-full flex-shrink-0 rounded-[10px] border border-neutral-300 bg-white overflow-hidden transition-[max-height] duration-300 ease-in-out ${
                                            rotatedStates[index]
                                                ? 'max-h-[200px]'
                                                : 'max-h-0'
                                        }`}
                                    >
                                        <div className="w-full text-body-03 font-medium text-neutral-700 leading-[18px] p-5 whitespace-pre-line">
                                            {item.content}
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {hasMore && !isLoading && (
                                <button onClick={loadMore}>더 보기</button>
                            )}
                            {isLoading && <div>로딩 중...</div>}
                        </>
                    ) : (
                        <div>등록된 공지사항이 없습니다.</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export { ServiceNoticePage };
