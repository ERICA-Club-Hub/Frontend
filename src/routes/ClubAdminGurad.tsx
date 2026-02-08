import { adminTypeSelector } from '@/domains/auth/model/auth.atom';
import { Navigate, Outlet, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { PATHS } from './paths';
import { clubIdSelector } from '@/domains/auth/model/clubInfo.atom';

export default function ClubAdminGurad() {
    const { id } = useParams<{ id: string }>();

    const adminType = useRecoilValue(adminTypeSelector);
    const myClubId = useRecoilValue(clubIdSelector);

    const clubId = Number(id);
    const isValidClubId = id && !isNaN(clubId) && clubId > 0;

    // 서비스 관리자일 경우 모든 동아리 접근 허용
    if (adminType === 'service') return <Outlet />;

    if (!isValidClubId) return <Navigate to={PATHS.WRONG_ACCESS} replace />;

    if (myClubId !== clubId)
        return <Navigate to={PATHS.WRONG_ACCESS} replace />;

    return adminType && adminType === 'club' ? (
        <Outlet />
    ) : (
        <Navigate to={PATHS.ADMIN_LOGIN} />
    );
}
