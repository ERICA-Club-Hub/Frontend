import { adminTypeSelector } from '@/store/authState';
import { Navigate, Outlet } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

export default function UnionAdminGuard() {
    const adminType = useRecoilValue(adminTypeSelector);

    return adminType === 'union' || adminType === 'service' ? (
        <Outlet />
    ) : (
        <Navigate to="/" />
    );
}
