import { adminTypeSelector } from '@/domains/auth/model/authState';
import { Navigate, Outlet } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

export default function ServiceAdminGuard() {
    const adminType = useRecoilValue(adminTypeSelector);

    return adminType === 'service' ? <Outlet /> : <Navigate to="/" />;
}
