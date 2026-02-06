import {
    CategoryOptions,
    getCentralCategoryOptionsNameOnly,
    getClubTypeOptions,
    getUnionCategoryOptionsNameOnly,
} from '@/utils/getCategoryOptions';

// 동아리 프로필 폼 필드 설정
export const PROFILE_FIELD_CONFIG = {
    clubName: {
        label: '동아리 이름',
        placeholder: '동아리 이름 작성',
    },
    leaderEmail: {
        label: '대표자 이메일',
        placeholder: '정확한 이메일 작성',
    },
    clubType: {
        label: '동아리 분류',
        placeholder: '동아리 분류 선택',
        options: getClubTypeOptions(),
    },
    category: {
        label: '분과 선택',
        hintText: '선택하신 동아리 분류에 속한 분과를 선택해 주세요.',
    },
    image: {
        label: '동아리 대표 사진',
        placeholder: '동아리 대표 사진 업로드 \n(최대 500KB)',
    },
    oneLiner: {
        label: '동아리 한 줄 소개',
        hintText:
            '유저가 피드에서 가장 먼저 읽게 될 동아리 정보예요. (18자 이내)',
        placeholder: '동아리 한 줄 소개 작성',
    },
    briefIntroduction: {
        label: '동아리 설명',
        hintText: '동아리 등록 승인을 위해 한자리에서 참고할 부분이에요.',
        placeholder: '동아리 추가 설명 작성',
    },
} as const;

// 동아리 분류/분과 드롭다운 설정
export const CATEGORY_CONFIG: Record<
    'CENTRAL' | 'UNION',
    {
        name: 'category.central' | 'category.union';
        options: CategoryOptions[];
        placeholder: string;
    }
> = {
    CENTRAL: {
        name: 'category.central' as const,
        options: getCentralCategoryOptionsNameOnly(),
        placeholder: '중앙동아리 분과 선택',
    },
    UNION: {
        name: 'category.union' as const,
        options: getUnionCategoryOptionsNameOnly(),
        placeholder: '연합동아리 분과 선택',
    },
};

export const ONE_LINER_MAX_LENGTH = 18;
