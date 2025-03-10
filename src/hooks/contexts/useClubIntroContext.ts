import { ClubIntroContext } from '@/contexts/ClubIntroContext';
import { useContext } from 'react';

export default function useActivityLogContext() {
    const context = useContext(ClubIntroContext);

    if (!context) {
        throw new Error(
            'useClubIntroContext must be used within a ClubIntroProvider',
        );
    }
    return context;
}
