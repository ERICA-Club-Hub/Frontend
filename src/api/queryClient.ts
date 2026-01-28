import { QueryClient } from '@tanstack/react-query';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false,
            refetchOnReconnect: true, // 네트워크 재접속 시 데이터 자동 fetch
            staleTime: 60 * 1000, // 1분
        },
        mutations: {
            retry: false,
        },
    },
});

export { queryClient };
