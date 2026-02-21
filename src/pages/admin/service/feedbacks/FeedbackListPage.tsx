import { useFeedbackQuery } from '@/domains/feedback/api/feedback.queries';
import FeedbackCard from '@/domains/feedback/ui/FeedbackCard';
import { useEffect, useRef } from 'react';

export default function FeedbackListPage() {
    const { data, isSuccess, fetchNextPage, hasNextPage, isFetchingNextPage } =
        useFeedbackQuery();

    const observerTarget = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observerCallback = (entries: IntersectionObserverEntry[]) => {
            const target = entries[0];
            if (target.isIntersecting && hasNextPage && !isFetchingNextPage) {
                fetchNextPage();
            }
        };
        const observer = new IntersectionObserver(observerCallback, {
            threshold: 1.0,
        });

        const currentTarget = observerTarget.current;

        if (currentTarget) {
            observer.observe(currentTarget);
        }

        return () => {
            if (currentTarget) {
                observer.unobserve(currentTarget);
            }
        };
    }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

    return (
        <div className="flex flex-col items-center py-[20px] gap-[24px] w-full">
            {isSuccess &&
                data &&
                data.map((feedback) => (
                    <FeedbackCard key={feedback.feedbackId} data={feedback} />
                ))}

            <div ref={observerTarget} className="h-10 w-full" />
        </div>
    );
}
