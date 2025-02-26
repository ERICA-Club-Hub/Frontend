import { adminNavigationMenus, navigationMenus } from '@/constants';
import { adminTypeSelector, isAuthenticatedSelector } from '@/store/authState';
import { useRecoilValue } from 'recoil';

export const useFilteredHeaderMenuList = () => {
    const adminType = useRecoilValue(adminTypeSelector);
    const isAuthenticated = useRecoilValue(isAuthenticatedSelector);
    let filteredMenus = [...navigationMenus]; // 기본 메뉴 리스트

    if (isAuthenticated) {
        // 어드민 유형에 따라 필터링된 메뉴
        const filteredAdminMenus = adminNavigationMenus.filter((menu) => {
            return menu.adminType.includes(adminType as string);
        });

        // 어드민 메뉴를 기존 메뉴 리스트에 추가
        filteredMenus = [...filteredAdminMenus, ...filteredMenus];
    }

    return filteredMenus;
};
