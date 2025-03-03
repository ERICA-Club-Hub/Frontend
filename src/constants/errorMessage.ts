import { ErrorConfig } from '@/types/api.types';

export const ERROR_MESSAGE: ErrorConfig = {
    '/api/clubs/club-admin/:clubId/introduction/draft': {
        // 404: {
        //     message: '임시저장된 소개를 찾을 수 없습니다',
        //     action: () => window.history.back(),
        // },
        403: {
            message: '비정상적인 접근입니다',
            action: () => window.history.back(),
        },
    },
    '/api/clubs/:clubId': {
        404: {
            message: '없는 동아리입니다.',
            action: () => window.history.back(),
        },
    },
    default: {},
};
