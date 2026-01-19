import {
    CentralCategoryDisplayConfig,
    CollegeDisplayConfig,
    DepartmentDisplayConfig,
    RecruitmentStatusDisplayConfig,
    SortByDisplayConfig,
    UnionCategoryDisplayConfig,
} from '@/types/display-configs.types';
import {
    CentralCategoryCode,
    CollegeCode,
    DepartmentCode,
    SortByCode,
    UnionCategoryCode,
} from '@/types/domain-category.types';
import { RecruitmentStatus } from '@/types/recruitment-status.type';

/**
 * 중앙 동아리 분류
 */
export const CENTRAL_CATEGORY_DISPLAYS: Record<
    CentralCategoryCode,
    CentralCategoryDisplayConfig
> = {
    VOLUNTEER: { code: 'VOLUNTEER', label: '봉사분과', emoji: '💌' },
    ART: { code: 'ART', label: '예술분과', emoji: '🎨' },
    SPORTS: { code: 'SPORTS', label: '체육분과', emoji: '⚽' },
    RELIGION: { code: 'RELIGION', label: '종교분과', emoji: '⛪️' },
    ACADEMIC: { code: 'ACADEMIC', label: '학술교양분과', emoji: '🎓' },
};

/**
 * 연합 동아리 분류
 */
export const UNION_CATEGORY_DISPLAYS: Record<
    UnionCategoryCode,
    UnionCategoryDisplayConfig
> = {
    IT: { code: 'IT', label: '🧩 연합동아리' },
    MARKETING_AD: { code: 'MARKETING_AD', label: '🧩 연합동아리' },
    ECONOMY_MANAGEMENT: {
        code: 'ECONOMY_MANAGEMENT',
        label: '🧩 연합동아리',
    },
    VOLUNTEER: { code: 'VOLUNTEER', label: '🧩 연합동아리' },
    SPORTS: { code: 'SPORTS', label: '🧩 연합동아리' },
    LANGUAGE: { code: 'LANGUAGE', label: '🧩 연합동아리' },
    PRESENTATION: { code: 'PRESENTATION', label: '🧩 연합동아리' },
    BOOK: { code: 'BOOK', label: '🧩 연합동아리' },
    ETC: { code: 'ETC', label: '🧩 연합동아리' },
};

/**
 * 단과대 분류
 */
export const COLLEGE_DISPLAYS: Record<CollegeCode, CollegeDisplayConfig> = {
    GLOBAL_LAW_COMMUNICATION: {
        code: 'GLOBAL_LAW_COMMUNICATION',
        label: '글로벌문화통상대학',
        emoji: '🌐',
    },
    KYUNG_SANG: { code: 'KYUNG_SANG', label: '경상대학', emoji: '💸' },
    COMMUNICATION_CULTURE: {
        code: 'COMMUNICATION_CULTURE',
        label: '커뮤니케이션&컬쳐대학',
        emoji: '📽️',
    },
    ENGINEERING: { code: 'ENGINEERING', label: '공학대학', emoji: '⚒️' },
    CONVERGENCE: { code: 'CONVERGENCE', label: '첨단융합대학', emoji: '🧪' },
    SOFTWARE: {
        code: 'SOFTWARE',
        label: '소프트웨어융합대학',
        emoji: '💻',
    },
    DESIGN: { code: 'DESIGN', label: '디자인대학', emoji: '🎨' },
    PHARMACY: { code: 'PHARMACY', label: '약학대학', emoji: '🩺' },
    SPORT_ARTS: { code: 'SPORT_ARTS', label: '예체능대학', emoji: '🩰' },
    LIONS_COLLEGE: {
        code: 'LIONS_COLLEGE',
        label: 'LIONS 칼리지',
        emoji: '🦁',
    },
};

/**
 * 학과명 - 코드
 */
export const DEPARTMENT_DISPLAYS: Record<
    DepartmentCode,
    DepartmentDisplayConfig
> = {
    ARCHITECTURE: { code: 'ARCHITECTURE', label: '건축학부' },
    CONSTRUCTION_ENVIRONMENT: {
        code: 'CONSTRUCTION_ENVIRONMENT',
        label: '건설환경공학과',
    },
    TRANSPORT_LOGISTICS: {
        code: 'TRANSPORT_LOGISTICS',
        label: '교통·물류공학과',
    },
    ELECTRICAL_ENGINEERING: {
        code: 'ELECTRICAL_ENGINEERING',
        label: '전자공학부',
    },
    BATTERY_MATERIAL_CHEMICAL: {
        code: 'BATTERY_MATERIAL_CHEMICAL',
        label: '배터리소재화학공학과',
    },
    MATERIAL_CHEMICAL: {
        code: 'MATERIAL_CHEMICAL',
        label: '재료화학공학과',
    },
    MECHANICAL: { code: 'MECHANICAL', label: '기계공학과' },
    INDUSTRIAL_MANAGEMENT: {
        code: 'INDUSTRIAL_MANAGEMENT',
        label: '산업경영공학과',
    },
    ROBOT: { code: 'ROBOT', label: '로봇공학과' },
    FUSION_SYSTEM: {
        code: 'FUSION_SYSTEM',
        label: '융합시스템공학과',
    },
    SMART_FUSION: {
        code: 'SMART_FUSION',
        label: '스마트융합공학부',
    },
    INTELLIGENT_ROBOT: {
        code: 'INTELLIGENT_ROBOT',
        label: '지능형로봇학과',
    },
    ENERGY_BIO: { code: 'ENERGY_BIO', label: '에너지바이오학과' },
    MARINE_FUSION: {
        code: 'MARINE_FUSION',
        label: '해양융합공학과',
    },

    // 소프트웨어융합대학
    COMPUTER: { code: 'COMPUTER', label: '컴퓨터학부' },
    ICT: { code: 'ICT', label: 'ICT융합학부' },
    AI: { code: 'AI', label: '인공지능학과' },
    DATA: { code: 'DATA', label: '수리데이터사이언스학과' },

    // 약학대학
    PHARMACY: { code: 'PHARMACY', label: '약학대학' },

    // 첨단융합대학
    SEMICONDUCTOR: {
        code: 'SEMICONDUCTOR',
        label: '차세대반도체융합공학부',
    },
    BIO: { code: 'BIO', label: '바이오신약융합학부' },
    DEFENSE_INTELLIGENCE: {
        code: 'DEFENSE_INTELLIGENCE',
        label: '국방지능정보융합공학부',
    },

    // 글로벌문화통상대학
    KOREAN_STUDIES: {
        code: 'KOREAN_STUDIES',
        label: '한국어문학과',
    },
    CHINA_STUDIES: { code: 'CHINA_STUDIES', label: '중국학과' },
    JAPAN_STUDIES: { code: 'JAPAN_STUDIES', label: '일본학과' },
    ENGLISH_STUDIES: {
        code: 'ENGLISH_STUDIES',
        label: '영미언어문학과',
    },
    FRENCH_STUDIES: { code: 'FRENCH_STUDIES', label: '프랑스학과' },

    // 커뮤니케이션&컬쳐대학
    ADVERTISING: { code: 'ADVERTISING', label: '광고홍보학과' },
    MEDIA: { code: 'MEDIA', label: '미디어학과' },
    CULTURE: { code: 'CULTURE', label: '문화콘텐츠학과' },
    ANTHROPOLOGY: { code: 'ANTHROPOLOGY', label: '문화인류학과' },

    // 경상대학
    BUSINESS_ADMINISTRATION: {
        code: 'BUSINESS_ADMINISTRATION',
        label: '경영학부',
    },
    ECONOMICS: { code: 'ECONOMICS', label: '경제학부' },
    ACTUARIAL_SCIENCE: {
        code: 'ACTUARIAL_SCIENCE',
        label: '보험계리학과',
    },
    ACCOUNTING: { code: 'ACCOUNTING', label: '회계세무학과' },

    // 디자인대학
    INTEGRATED_DESIGN: {
        code: 'INTEGRATED_DESIGN',
        label: '디자인계열',
    },
    JEWELRY: { code: 'JEWELRY', label: '주얼리·패션디자인' },
    INDUSTRIAL_DESIGN: {
        code: 'INDUSTRIAL_DESIGN',
        label: '산업디자인학과',
    },
    COMMUNICATION_DESIGN: {
        code: 'COMMUNICATION_DESIGN',
        label: '커뮤니케이션디자인',
    },
    MEDIA_DESIGN: { code: 'MEDIA_DESIGN', label: '영상디자인' },

    SPORTS_SCIENCE: {
        code: 'SPORTS_SCIENCE',
        label: '스포츠과학부',
    },
    DANCE: { code: 'DANCE', label: '무용예술학과' },
    MUSIC: { code: 'MUSIC', label: '실용음악학과' },
};

export const RECRUITMENT_STATUS_DISPLAYS: Record<
    RecruitmentStatus,
    RecruitmentStatusDisplayConfig
> = {
    UPCOMING: {
        code: 'UPCOMING',
        label: '모집예정',
        backgroundColor: 'bg-badge-green-bg',
        textColor: 'text-badge-green-text',
    },
    OPEN: {
        code: 'OPEN',
        label: '모집중',
        backgroundColor: 'bg-badge-orange-bg',
        textColor: 'text-badge-orange-text',
    },
    CLOSED: {
        code: 'CLOSED',
        label: '모집마감',
        backgroundColor: 'bg-badge-gray-bg',
        textColor: 'text-badge-gray-text',
    },
    ALWAYS_OPEN: {
        code: 'ALWAYS_OPEN',
        label: '상시모집',
        backgroundColor: 'bg-badge-purple-bg',
        textColor: 'text-badge-purple-text',
    },
    ADDITIONAL: {
        code: 'ADDITIONAL',
        label: '추가모집',
        backgroundColor: 'bg-badge-red-bg',
        textColor: 'text-badge-red-text',
    },
};

export const SORT_BY_DISPLAYS: Record<SortByCode, SortByDisplayConfig> = {
    NAME_ASC: { code: 'NAME_ASC', label: '이름순' },
    CATEGORY_ASC: { code: 'CATEGORY_ASC', label: '카테고리순' },
    RECRUITMENT_STATUS_ASC: {
        code: 'RECRUITMENT_STATUS_ASC',
        label: '모집상태순',
    },
};

export const COLLEGE_DEPARTMENT_MAPPING: Record<CollegeCode, DepartmentCode[]> =
    {
        ENGINEERING: [
            'ARCHITECTURE',
            'CONSTRUCTION_ENVIRONMENT',
            'TRANSPORT_LOGISTICS',
            'ELECTRICAL_ENGINEERING',
            'BATTERY_MATERIAL_CHEMICAL',
            'MATERIAL_CHEMICAL',
            'MECHANICAL',
            'INDUSTRIAL_MANAGEMENT',
            'ROBOT',
            'FUSION_SYSTEM',
            'SMART_FUSION',
            'INTELLIGENT_ROBOT',
            'ENERGY_BIO',
            'MARINE_FUSION',
        ],
        SOFTWARE: ['COMPUTER', 'ICT', 'AI', 'DATA'],
        CONVERGENCE: ['SEMICONDUCTOR', 'BIO', 'DEFENSE_INTELLIGENCE'],
        GLOBAL_LAW_COMMUNICATION: [
            'KOREAN_STUDIES',
            'CHINA_STUDIES',
            'JAPAN_STUDIES',
            'ENGLISH_STUDIES',
            'FRENCH_STUDIES',
        ],
        COMMUNICATION_CULTURE: [
            'ADVERTISING',
            'MEDIA',
            'CULTURE',
            'ANTHROPOLOGY',
        ],
        KYUNG_SANG: [
            'BUSINESS_ADMINISTRATION',
            'ECONOMICS',
            'ACTUARIAL_SCIENCE',
            'ACCOUNTING',
        ],
        DESIGN: [
            'INTEGRATED_DESIGN',
            'JEWELRY',
            'INDUSTRIAL_DESIGN',
            'COMMUNICATION_DESIGN',
            'MEDIA_DESIGN',
        ],
        SPORT_ARTS: ['SPORTS_SCIENCE', 'DANCE', 'MUSIC'],
        PHARMACY: ['PHARMACY'],
        LIONS_COLLEGE: [],
    };
