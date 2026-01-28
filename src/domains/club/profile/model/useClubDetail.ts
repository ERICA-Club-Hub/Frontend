import { useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

export const useClubDetail = () => {
    const location = useLocation();
    const nowUrl = location.pathname.split('/')[1];
    const { id } = useParams();
    const [activeTab, setActiveTab] = useState('intro');
    const isPreview = nowUrl === 'club-detail-preview';

    return {
        clubId: id,
        activeTab,
        setActiveTab,
        isPreview,
    };
};
