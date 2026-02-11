import { useInfiniteQuery } from '@tanstack/react-query';

import { apiRequest } from '@/api/apiRequest';
import { ServiceAnnouncementSearchDTO } from '@/api/data-contracts';

const PAGE_SIZE = 10;

export const useNotices = () =>
    useInfiniteQuery({
        queryKey: ['notices'],
        queryFn: async ({
            pageParam,
        }): Promise<ServiceAnnouncementSearchDTO> => {
            const data = await apiRequest({
                url: `/api/service-announcements?page=${pageParam}&size=${PAGE_SIZE}`,
            });
            return data.result;
        },
        initialPageParam: 0,
        getNextPageParam: (lastPage, allPages) => {
            const totalLoaded = allPages.flatMap(
                (p) => p.serviceAnnouncements ?? [],
            ).length;
            if (totalLoaded >= (lastPage.totalElements ?? 0)) return undefined;
            return allPages.length;
        },
    });
