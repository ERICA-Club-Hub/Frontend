import { UnionNotice } from '@/components/UnionNotice/UnionNotice';
import { useLocation } from 'react-router-dom';

const UnionNoticePage = () => {
    const location = useLocation();
    const isEditMode = location.pathname.includes('/admin/union/notice');

    return <UnionNotice editMode={isEditMode} />;
};

export { UnionNoticePage };
