import { ClubIntroContext } from '@/domains/shared/contexts/ClubIntroContext';
import { useContext } from 'react';

export default function useClubIntroContext() {
    const context = useContext(ClubIntroContext);

    if (!context) {
        throw new Error(
            'useClubIntroContext must be used within a ClubIntroProvider',
        );
    }
    return context;
}
