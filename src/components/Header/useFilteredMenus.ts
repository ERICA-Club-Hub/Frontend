import { useRecoilValue } from 'recoil';
import {
    adminTypeSelector,
    isAuthenticatedSelector,
} from '@/domains/auth/model/auth.atom';
import { clubIdSelector } from '@/domains/auth/model/clubInfo.atom';
import { ADMIN_TYPE } from '@/types/admin.types';
import { adminMenus, baseMenus, HeaderMenuType, PATHS } from '@/routes/paths';

export const useFilteredMenus = () => {
    const adminType = useRecoilValue(adminTypeSelector);
    const clubId = useRecoilValue(clubIdSelector);
    const isAuthenticated = useRecoilValue(isAuthenticatedSelector);

    let menus: HeaderMenuType[] = [...baseMenus]; // 기본 메뉴 리스트

    if (isAuthenticated) {
        // 어드민 타입과 일치하는 어드민 메뉴 템플릿 찾기
        const adminMenuTemplate = adminMenus.find(
            (menu) => menu.adminType === adminType,
        );

        if (adminMenuTemplate) {
            const adminMenu = { ...adminMenuTemplate };

            // 동아리 어드민이면, 동아리 id를 붙여 동적 라우팅
            if (adminMenu.adminType === ADMIN_TYPE.CLUB && clubId) {
                adminMenu.url = PATHS.ADMIN_CLUB(clubId);
            }

            menus = [...menus, adminMenu];
        }
    }

    return menus;
};
