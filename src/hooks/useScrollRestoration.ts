import { useCallback, useEffect, useRef } from 'react';

interface UseScrollRestorationOptions {
    storageKey: string;
    pageCount: number;
    isLoading: boolean;
    isFetchingNextPage: boolean;
    hasNextPage: boolean;
    fetchNextPage: () => void;
}

export const useScrollRestoration = ({
    storageKey,
    pageCount,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
}: UseScrollRestorationOptions) => {
    const restoreTarget = useRef<{ y: number; pageCount: number } | null>(null);
    const hasRestored = useRef(false);

    useEffect(() => {
        const saved = sessionStorage.getItem(storageKey);
        if (!saved) return;
        try {
            restoreTarget.current = JSON.parse(saved);
        } catch {
            // sessionStorage 값이 올바른 JSON 형식이 아닐 경우 무시
        }
        sessionStorage.removeItem(storageKey);
    }, [storageKey]);

    useEffect(() => {
        const target = restoreTarget.current;
        if (!target || hasRestored.current || isLoading || isFetchingNextPage)
            return;

        if (pageCount < target.pageCount && hasNextPage) {
            fetchNextPage();
            return;
        }

        window.scrollTo({ top: target.y, behavior: 'instant' });
        hasRestored.current = true;
        restoreTarget.current = null;
    }, [pageCount, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage]);

    const saveScroll = useCallback(() => {
        sessionStorage.setItem(
            storageKey,
            JSON.stringify({ y: window.scrollY, pageCount }),
        );
    }, [storageKey, pageCount]);

    return { saveScroll };
};
