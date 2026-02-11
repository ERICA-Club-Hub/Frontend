import { useEffect, useRef } from 'react';

import { useNotices } from '@/domains/notice/api/notice.queries';
import NoticeItem from '@/domains/notice/ui/NoticeItem';

export default function NoticePage() {
    const { data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } =
        useNotices();

    const sentinelRef = useRef<HTMLDivElement>(null);

    // TODO useInfiniteScroll 분리 -> searchPage와 통합
    useEffect(() => {
        const sentinel = sentinelRef.current;
        if (!sentinel) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && hasNextPage && !isFetchingNextPage)
                    fetchNextPage();
            },
            { threshold: 0.1 },
        );

        observer.observe(sentinel);
        return () => observer.disconnect();
    }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

    const notices = data?.pages.flatMap((p) => p.serviceAnnouncements ?? []);

    return (
        <div className="flex flex-col items-center w-full">
            <div className="w-[320px] flex flex-col">
                <div className="text-body-01 font-semibold text-black my-5">
                    서비스 공지사항
                </div>
                <div className="flex flex-col w-full gap-2">
                    {isLoading ? (
                        <div>로딩 중...</div>
                    ) : !notices?.length ? (
                        <div>등록된 공지사항이 없습니다.</div>
                    ) : (
                        notices.map((notice) => (
                            <NoticeItem key={notice.id} notice={notice} />
                        ))
                    )}

                    {isFetchingNextPage && <div>로딩 중...</div>}
                    <div ref={sentinelRef} className="h-px" />
                </div>
            </div>
        </div>
    );
}
