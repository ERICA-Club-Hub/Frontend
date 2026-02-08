import { useRecoilValue } from 'recoil';
import { getClubAdminMenus } from '@/routes/paths';
import {
    clubIdSelector,
    clubNameSelector,
} from '@/domains/auth/model/clubInfo.atom';
import { NavigationLink } from '@/components/Link/NavigationLink';

export default function ClubAdminDashboardPage() {
    const clubId = useRecoilValue(clubIdSelector);
    const clubName = useRecoilValue(clubNameSelector);
    const menus = clubId !== null ? getClubAdminMenus(clubId) : [];

    return (
        <div className="w-full h-full flex flex-col items-center">
            <div className="w-[320px] flex flex-col items-center justify-center gap-5 mt-[50px]">
                <h1 className="w-full text-body-01 font-semibold text-black">
                    {clubName}님, 환영해요.
                </h1>

                <div className="flex flex-col items-center gap-[10px]">
                    {menus.map((menu) => (
                        <NavigationLink
                            key={menu.label}
                            size="large"
                            url={menu.url}
                        >
                            {menu.label}
                        </NavigationLink>
                    ))}
                </div>
            </div>
        </div>
    );
}
