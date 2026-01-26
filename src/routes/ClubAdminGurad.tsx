import { adminTypeSelector } from '@/domains/auth/model/auth.atom';
import { Navigate, Outlet } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

export default function ClubAdminGurad() {
    const adminType = useRecoilValue(adminTypeSelector);

    return adminType === 'club' || adminType === 'service' ? (
        <Outlet />
    ) : (
        <Navigate to="/admin/login" />
    );
}
