import { ErrorPageContent } from '@/components/Error/ErrorPageTemplate';
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
        // 404: {
        //     message: '없는 동아리입니다.',
        //     action: () => window.history.back(),
        // },
    },
    default: {},
};

export const PAGE_ERROR_MESSAGE: Record<string, ErrorPageContent> = {
    WRONG_ACCESS: {
        title: '잘못된 접근이에요.',
        description: '현재 해당 페이지를 찾을 수 없어요.',
        buttonLabel: '홈으로 가기',
    },
    NETWORK_ERROR: {
        title: '현재 접속이 원활하지 않아요.',
        description: '네트워크 연결 상태를 확인해 주세요.',
        buttonLabel: '다시 시도하기',
    },
    SERVER_ERROR: {
        title: '시스템 오류가 발생했습니다.',
        description: '잠시 후 다시 시도해주세요.',
        buttonLabel: '홈으로 가기',
    },
    UNKNOWN_ERROR: {
        title: '오류가 발생했습니다.',
        description: '잠시 후 다시 시도해주세요.',
        buttonLabel: '다시 시도하기',
    },
};
