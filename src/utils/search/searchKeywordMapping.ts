// 타입 정의
export type CollegeCode =
    | 'GLOBAL_LAW_COMMUNICATION'
    | 'KYUNG_SANG'
    | 'COMMUNICATION_CULTURE'
    | 'ENGINEERING'
    | 'CONVERGENCE'
    | 'SOFTWARE'
    | 'DESIGN'
    | 'PHARMACY'
    | 'SPORT_ARTS'
    | 'LIONS_COLLEGE';

// 중앙 동아리 카테고리
export type CentralCategoryCode =
    | 'VOLUNTEER'
    | 'ART'
    | 'SPORTS'
    | 'RELIGION'
    | 'ACADEMIC';

// 연합 동아리 카테고리
export type UnionCategoryCode =
    | 'IT'
    | 'MARKETING_AD'
    | 'ECONOMY_MANAGEMENT'
    | 'VOLUNTEER'
    | 'SPORTS'
    | 'LANGUAGE'
    | 'PRESENTATION'
    | 'BOOK'
    | 'ETC';

export type DepartmentCode =
    // 공학대학
    | 'ARCHITECTURE'
    | 'CONSTRUCTION_ENVIRONMENT'
    | 'TRANSPORT_LOGISTICS'
    | 'ELECTRICAL_ENGINEERING'
    | 'BATTERY_MATERIAL_CHEMICAL'
    | 'MATERIAL_CHEMICAL'
    | 'MECHANICAL'
    | 'INDUSTRIAL_MANAGEMENT'
    | 'ROBOT'
    | 'FUSION_SYSTEM'
    | 'SMART_FUSION'
    | 'INTELLIGENT_ROBOT'
    | 'ENERGY_BIO'
    | 'MARINE_FUSION'
    // 소프트웨어융합대학
    | 'COMPUTER'
    | 'ICT'
    | 'AI'
    | 'DATA'
    // 약학대학
    | 'PHARMACY'
    // 첨단융합대학
    | 'SEMICONDUCTOR'
    | 'BIO'
    | 'DEFENSE_INTELLIGENCE'
    // 글로벌문화통상대학
    | 'KOREAN_STUDIES'
    | 'CHINA_STUDIES'
    | 'JAPAN_STUDIES'
    | 'ENGLISH_STUDIES'
    | 'FRENCH_STUDIES'
    // 커뮤니케이션&컬쳐대학
    | 'ADVERTISING'
    | 'MEDIA'
    | 'CULTURE'
    | 'ANTHROPOLOGY'
    // 경상대학
    | 'BUSINESS_ADMINISTRATION'
    | 'ECONOMICS'
    | 'ACTUARIAL_SCIENCE'
    | 'ACCOUNTING'
    // 디자인대학
    | 'INTEGRATED_DESIGN'
    | 'JEWELRY'
    | 'INDUSTRIAL_DESIGN'
    | 'COMMUNICATION_DESIGN'
    | 'MEDIA_DESIGN'
    // 예체능대학
    | 'SPORTS_SCIENCE'
    | 'DANCE'
    | 'MUSIC';

export interface CategoryOption {
    value: CentralCategoryCode | UnionCategoryCode;
    label: string;
}

export interface DepartmentInfo {
    code: DepartmentCode;
    name: string;
}

export interface CollegeInfo {
    code: CollegeCode;
    name: string;
}

// 중앙 동아리 카테고리 매핑 (이모지 추가)
export const CENTRAL_CATEGORY_MAPPING: Record<CentralCategoryCode, string> = {
    VOLUNTEER: '🧡 봉사분과',
    ART: '🎨 예술분과',
    SPORTS: '⚽ 체육분과',
    RELIGION: '🛐 종교분과',
    ACADEMIC: '🎓 학술교양분과',
};

// 연합 동아리 카테고리 매핑 (이모지 추가)
export const UNION_CATEGORY_MAPPING: Record<UnionCategoryCode, string> = {
    IT: '💻 IT',
    MARKETING_AD: '📊 마케팅/광고',
    ECONOMY_MANAGEMENT: '📈 경제/경영',
    VOLUNTEER: '🧡 봉사',
    SPORTS: '⚽ 스포츠',
    LANGUAGE: '💬 언어',
    PRESENTATION: '✏️ 발표',
    BOOK: '📚 독서',
    ETC: '🍀 그외 기타',
};

// 단과대학 매핑 (이모지 추가)
export const COLLEGE_MAPPING: Record<CollegeCode, string> = {
    GLOBAL_LAW_COMMUNICATION: '🌐 글로벌문화통상대학',
    KYUNG_SANG: '💸 경상대학',
    COMMUNICATION_CULTURE: '📽️ 커뮤니케이션&컬쳐대학',
    ENGINEERING: '⚒️ 공학대학',
    CONVERGENCE: '🧪 첨단융합대학',
    SOFTWARE: '💻 소프트웨어융합대학',
    DESIGN: '🎨 디자인대학',
    PHARMACY: '🩺 약학대학',
    SPORT_ARTS: '🩰 예체능대학',
    LIONS_COLLEGE: '🦁 LIONS 칼리지',
};

// 학과 매핑 (해당 단과대학 이모지 사용)
export const DEPARTMENT_MAPPING: Record<DepartmentCode, string> = {
    // 공학대학 (⚒️)
    ARCHITECTURE: '⚒️ 건축학부',
    CONSTRUCTION_ENVIRONMENT: '⚒️ 건설환경공학과',
    TRANSPORT_LOGISTICS: '⚒️ 교통·물류공학과',
    ELECTRICAL_ENGINEERING: '⚒️ 전자공학부',
    BATTERY_MATERIAL_CHEMICAL: '⚒️ 배터리소재화학공학과',
    MATERIAL_CHEMICAL: '⚒️ 재료화학공학과',
    MECHANICAL: '⚒️ 기계공학과',
    INDUSTRIAL_MANAGEMENT: '⚒️ 산업경영공학과',
    ROBOT: '⚒️ 로봇공학과',
    FUSION_SYSTEM: '⚒️ 융합시스템공학과',
    SMART_FUSION: '⚒️ 스마트융합공학부',
    INTELLIGENT_ROBOT: '⚒️ 지능형로봇학과',
    ENERGY_BIO: '⚒️ 에너지바이오학과',
    MARINE_FUSION: '⚒️ 해양융합공학과',

    // 소프트웨어융합대학 (💻)
    COMPUTER: '💻 컴퓨터학부',
    ICT: '💻 ICT융합학부',
    AI: '💻 인공지능학과',
    DATA: '💻 수리데이터사이언스학과',

    // 약학대학 (🩺)
    PHARMACY: '🩺 약학대학',

    // 첨단융합대학 (🧪)
    SEMICONDUCTOR: '🧪 차세대반도체융합공학부',
    BIO: '🧪 바이오신약융합학부',
    DEFENSE_INTELLIGENCE: '🧪 국방지능정보융합공학부',

    // 글로벌문화통상대학 (🌐)
    KOREAN_STUDIES: '🌐 한국어문학과',
    CHINA_STUDIES: '🌐 중국학과',
    JAPAN_STUDIES: '🌐 일본학과',
    ENGLISH_STUDIES: '🌐 영미언어문학과',
    FRENCH_STUDIES: '🌐 프랑스학과',

    // 커뮤니케이션&컬쳐대학 (📽️)
    ADVERTISING: '📽️ 광고홍보학과',
    MEDIA: '📽️ 미디어학과',
    CULTURE: '📽️ 문화콘텐츠학과',
    ANTHROPOLOGY: '📽️ 문화인류학과',

    // 경상대학 (💸)
    BUSINESS_ADMINISTRATION: '💸 경영학부',
    ECONOMICS: '💸 경제학부',
    ACTUARIAL_SCIENCE: '💸 보험계리학과',
    ACCOUNTING: '💸 회계세무학과',

    // 디자인대학 (🎨)
    INTEGRATED_DESIGN: '🎨 디자인계열',
    JEWELRY: '🎨 주얼리·패션디자인',
    INDUSTRIAL_DESIGN: '🎨 산업디자인학과',
    COMMUNICATION_DESIGN: '🎨 커뮤니케이션디자인',
    MEDIA_DESIGN: '🎨 영상디자인',

    // 예체능대학 (🩰)
    SPORTS_SCIENCE: '🩰 스포츠과학부',
    DANCE: '🩰 무용예술학과',
    MUSIC: '🩰 실용음악학과',
};

// 단과대학별 학과 그룹핑
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
        LIONS_COLLEGE: [], // 자율전공이므로 특정 학과 없음
    };

// 헬퍼 함수들
export const getCollegeDisplay = (collegeCode: CollegeCode): string => {
    return COLLEGE_MAPPING[collegeCode] || collegeCode;
};

export const getDepartmentDisplay = (
    departmentCode: DepartmentCode,
): string => {
    return DEPARTMENT_MAPPING[departmentCode] || departmentCode;
};

export const getCentralCategoryDisplay = (
    categoryCode: CentralCategoryCode,
): string => {
    return CENTRAL_CATEGORY_MAPPING[categoryCode] || categoryCode;
};

export const getUnionCategoryDisplay = (
    categoryCode: UnionCategoryCode,
): string => {
    return UNION_CATEGORY_MAPPING[categoryCode] || categoryCode;
};

// 단과대별 학과 받아오는 함수
export const getDepartmentsByCollege = (
    collegeCode: CollegeCode,
): DepartmentInfo[] => {
    const departments = COLLEGE_DEPARTMENT_MAPPING[collegeCode] || [];
    return departments.map((dept) => ({
        code: dept,
        name: DEPARTMENT_MAPPING[dept],
    }));
};

// 드롭다운용 옵션 생성
export const getCollegeOptions = (): {
    value: CollegeCode;
    label: string;
}[] => {
    return (Object.entries(COLLEGE_MAPPING) as [CollegeCode, string][]).map(
        ([code, name]) => ({
            value: code,
            label: name,
        }),
    );
};

export const getDepartmentOptions = (
    collegeCode?: string,
): {
    value: DepartmentCode;
    label: string;
}[] => {
    if (collegeCode && collegeCode in COLLEGE_MAPPING) {
        return getDepartmentsByCollege(collegeCode as CollegeCode).map(
            (dept) => ({
                value: dept.code,
                label: dept.name,
            }),
        );
    }

    return (
        Object.entries(DEPARTMENT_MAPPING) as [DepartmentCode, string][]
    ).map(([code, name]) => ({
        value: code,
        label: name,
    }));
};

export const getCentralCategoryOptions = (): {
    value: CentralCategoryCode;
    label: string;
}[] => {
    return (
        Object.entries(CENTRAL_CATEGORY_MAPPING) as [
            CentralCategoryCode,
            string,
        ][]
    ).map(([code, name]) => ({
        value: code,
        label: name,
    }));
};

export const getUnionCategoryOptions = (): {
    value: UnionCategoryCode;
    label: string;
}[] => {
    return (
        Object.entries(UNION_CATEGORY_MAPPING) as [UnionCategoryCode, string][]
    ).map(([code, name]) => ({
        value: code,
        label: name,
    }));
};

export const getCentralCategoryDisplayByKoreanName = (
    koreanName: string,
): string => {
    const categoryEntry = Object.entries(CENTRAL_CATEGORY_MAPPING).find(
        ([_, value]) => value.includes(koreanName),
    );
    return categoryEntry ? categoryEntry[1] : `🎓 ${koreanName}`;
};
