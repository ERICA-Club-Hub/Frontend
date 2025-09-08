import { ClubDetailContext, ClubDetailContextType } from '@/pages';
import { ReactNode } from 'react';

interface ClubDetailProviderProps {
    children: ReactNode;
    value: ClubDetailContextType;
}

export const ClubDetailProvider = ({
    children,
    value,
}: ClubDetailProviderProps) => {
    return (
        <ClubDetailContext.Provider value={value}>
            {children}
        </ClubDetailContext.Provider>
    );
};
