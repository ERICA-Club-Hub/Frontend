import { useEffect } from 'react';

interface UseInfiniteScrollOptions {
    hasNextPage: boolean;
    isFetchingNextPage: boolean;
    fetchNextPage: () => void;
    threshold?: number;
}

export const useInfiniteScroll = ({
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    threshold = 1000,
}: UseInfiniteScrollOptions) => {
    useEffect(() => {
        const handleScroll = () => {
            if (
                window.innerHeight + document.documentElement.scrollTop >=
                document.documentElement.offsetHeight - threshold
            ) {
                if (hasNextPage && !isFetchingNextPage) {
                    fetchNextPage();
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [hasNextPage, isFetchingNextPage, fetchNextPage, threshold]);
};
