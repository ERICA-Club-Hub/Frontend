import CompletedIcon from '@/assets/common/completed.svg?react';

export const ALERT_MODAL_MESSAGE = {
    SAVE: {
        title: '저장되었습니다.',
        actionLabel: '확인',
    },
    DELETE: {
        title: '삭제 완료되었습니다.',
        actionLabel: '확인',
    },
    APPROVE: {
        title: '승인 처리되었습니다.',
        actionLabel: '확인',
    },
    REJECT: {
        title: '거절 완료되었습니다.',
        actionLabel: '확인',
    },
    UPLOAD: {
        title: '업로드 되었습니다.',
        actionLabel: '확인',
    },
    UPDATE: {
        title: '수정 완료되었습니다.',
        actionLabel: '확인',
    },

    FEEDBACK: {
        title: '소중한 피드백 감사합니다. \n서비스 발전에 꼭 참고해보겠습니다.',
        actionLabel: '동아리 구경하기',
        icon: <CompletedIcon />,
    },
    EMAIL: {
        title: '작성한 이메일로 \n모집이 시작되면 알려드릴게요.',
        actionLabel: '동아리 더 알아보기',
        icon: <CompletedIcon />,
    },
};

export const CONFIRM_MODAL_MESSAGE = {
    APPROVE: {
        title: '승인하시겠습니까?',
        actionLabel: '승인',
    },
    UPLOAD: {
        title: '업로드 하시겠습니까?',
        actionLabel: '업로드',
    },
    DELETE: {
        title: '정말 삭제하시겠습니까?',
        actionLabel: '삭제',
    },
    REJECT: {
        title: '정말 거절하시겠습니까?',
        actionLabel: '거절',
    },
};

export const PROMPT_MODAL_MESSAGE = {
    FEEDBACK: {
        title: '이용 경험을 공유해주세요.',
        placeholder: '오류, 건의사항, 칭찬 등 모두 환영입니다. :)',
    },
    EMAIL: {
        title: '이메일을 입력하면, 모집할 때 알림을 드려요',
        placeholder: '이메일을 정확하게 입력해주세요.',
    },
};
