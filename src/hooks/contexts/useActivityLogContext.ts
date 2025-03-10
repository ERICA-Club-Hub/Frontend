import { ActivityLogContext } from '@/contexts/ActivityLogContext';
import { useContext } from 'react';

export default function useActivityLogContext() {
    const context = useContext(ActivityLogContext);

    if (!context) {
        throw new Error(
            'useClubIntroContext must be used within a ClubIntroProvider',
        );
    }
    return context;
}
