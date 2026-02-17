import { PATHS } from '@/routes/paths';
import { ADMIN_TYPE, AdminType } from '@/types/admin.types';

export interface AppHeaderMenuType {
    label: string;
    adminType: AdminType;
    url?: string;
}

// --- Drawer 메뉴 리스트 ---
/* 기본 메뉴 리스트 */
export const baseMenus: AppHeaderMenuType[] = [
    {
        label: '공지사항',
        adminType: null,
        url: PATHS.NOTICE,
    },
    {
        label: '자주 묻는 질문',
        adminType: null,
        url: PATHS.FAQ,
    },
];
/* 어드민 타입에 따른 메뉴 리스트 */
export const adminMenus: AppHeaderMenuType[] = [
    {
        // --- 서비스 어드민 ---
        label: '어드민 페이지',
        adminType: ADMIN_TYPE.SERVICE,
        url: PATHS.SERVICE_ADMIN_DASHBOARD,
    },
    {
        // --- 동아리 어드민 ---
        label: '어드민 페이지',
        adminType: ADMIN_TYPE.CLUB,

        /* clubId는 PATHS에서 직접 동적 라우팅으로 처리
         * 0은 더미 데이터
         */
        url: PATHS.CLUB_ADMIN_DASHBOARD(0),
    },
];

/* 동아리 어드민 대시보드 페이지 */
export const getClubAdminMenus = (clubId: number) => [
    {
        label: '동아리 기본 정보 관리',
        description: '동아리 이름, 한줄 소개, 동아리 소속, 대표 사진 등',
        url: PATHS.CLUB_ADMIN_PROFILE(clubId),
    },
    {
        label: '상세 페이지 관리',
        description: '동아리 상세 페이지에 나오는 모든 정보 관리',
        url: PATHS.CLUB_ADMIN_DETAIL(clubId),
    },
];

/* 서비스 어드민 대시보드 페이지 */
export const serviceAdminMenus = {
    NEW_CLUBS: [
        {
            label: '신규 동아리 신청 관리',
            url: PATHS.SERVICE_ADMIN_REGISTRATIONS,
        },
    ],
    REGISTRATED_CLUBS: [
        {
            label: '동아리 관리',
            url: PATHS.SERVICE_ADMIN_CLUBS,
        },
        {
            label: '동아리 정보 수정 요청 관리',
            url: PATHS.SERVICE_ADMIN_CLUB_UPDATE,
        },
    ],
    ETC: [
        {
            label: '공지사항 등록',
            url: PATHS.SERVICE_ADMIN_NOTICE,
        },
        {
            label: '자주 묻는 질문 등록',
            url: PATHS.SERVICE_ADMIN_FAQ,
        },
        {
            label: '유저 피드백 모음',
            url: PATHS.SERVICE_ADMIN_FEEDBACK,
        },
    ],
};
