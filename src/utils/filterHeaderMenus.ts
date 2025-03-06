import { adminNavigationMenus, navigationMenus } from '@/constants';
import { adminTypeSelector, isAuthenticatedSelector } from '@/store/authState';
import { clubIdSelector } from '@/store/clubInfoState';
import { useRecoilValue } from 'recoil';

export const filterHeaderMenus = () => {
    const adminType = useRecoilValue(adminTypeSelector);
    const clubId = useRecoilValue(clubIdSelector);
    const isAuthenticated = useRecoilValue(isAuthenticatedSelector);
    let filteredMenus = [...navigationMenus]; // 기본 메뉴 리스트

    if (isAuthenticated) {
        // 어드민 유형에 따라 필터링된 메뉴
        const filteredAdminMenus = adminNavigationMenus
            .filter((menu) => menu.adminType.includes(adminType as string))
            .map((menu) => {
                // 동아리 관리자 메뉴일 경우 동아리 id를 붙여 동적 라우팅
                if (menu.adminType.includes('club')) {
                    return {
                        ...menu,
                        url: `/admin/club/${clubId}`,
                    };
                }
                return menu;
            });

        // 어드민 메뉴를 기존 메뉴 리스트에 추가
        filteredMenus = [...filteredAdminMenus, ...filteredMenus];
    }

    return filteredMenus;
};
