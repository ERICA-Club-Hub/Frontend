import { ClubRecruitmentResponse } from '@/api/data-contracts';

// 서버에 보낼 모집 상태 값 매핑
export const RECRUITMENT_STATUS_MAP = {
    UPCOMING: 0,
    OPEN: 1,
    CLOSED: 2,
    ALWAYS_OPEN: 3,
    ADDITIONAL: 4,
};

export const RECRUIT_FIELD_CONFIG: {
    name: keyof ClubRecruitmentResponse;
    label: string;
    required: boolean;
    hintText?: string;
    placeholder?: string;
}[] = [
    {
        name: 'due',
        label: '모집 기간',
        hintText: '이번 기수 모집 기간, 추가 모집 예정 여부, 상시 모집 여부 등',
        required: false,
        placeholder: '모집 기간 작성',
    },
    {
        name: 'target',
        label: '모집 대상',
        hintText: '어떤 사람을 환영하는지, 필요한 태도/조건, 경험·전공 등',
        required: false,
        placeholder: '모집 대상 작성',
    },
    {
        name: 'notice',
        label: '유의사항',
        hintText: '유의하거나, 알아야할 사항이 있다면 작성해 주세요.',
        required: false,
        placeholder: '유의사항 작성',
    },
    {
        name: 'etc',
        label: '기타사항',
        required: false,
        placeholder: '기타 안내 사항 작성',
    },
];
