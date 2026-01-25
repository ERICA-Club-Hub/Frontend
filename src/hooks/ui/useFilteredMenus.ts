import { useRecoilValue } from 'recoil';
import {
    adminTypeSelector,
    isAuthenticatedSelector,
} from '@/domains/auth/model/authState';
import { clubIdSelector } from '@/domains/auth/model/clubInfoState';
import { ADMIN_TYPE } from '@/types/admin.types';
import { adminMenus, baseMenus, PATHS } from '@/routes/paths';
import { DrawerMenuType } from '@/types/routes.types';

export const useFilteredMenus = () => {
    const adminType = useRecoilValue(adminTypeSelector);
    const clubId = useRecoilValue(clubIdSelector);
    const isAuthenticated = useRecoilValue(isAuthenticatedSelector);

    let menus: DrawerMenuType[] = [...baseMenus]; // 기본 메뉴 리스트

    if (isAuthenticated) {
        // 어드민 타입과 일치하는 어드민 메뉴 템플릿 찾기
        const adminMenuTemplate = adminMenus.find(
            (menu) => menu.adminType === adminType,
        );

        if (adminMenuTemplate) {
            let adminMenu = { ...adminMenuTemplate };

            // 동아리 어드민이면, 동아리 id를 붙여 동적 라우팅
            if (adminMenu.adminType === ADMIN_TYPE.CLUB && clubId) {
                adminMenu.url = PATHS.ADMIN_CLUB(clubId);
            }

            menus = [adminMenu, ...menus];
        }
    }

    return menus;
};
