import { createContext, ReactNode } from 'react';
import { IClubDescription, IMonthlyEventSchedule } from '@/types';

interface IClubIntroProviderValue {
    children: ReactNode;
    value: IMonthlyEventSchedule & IClubDescription;
}

const ClubIntroContext = createContext<
    (IMonthlyEventSchedule & IClubDescription) | null
>(null);

function ClubIntroProvider({ children, value }: IClubIntroProviderValue) {
    return (
        <ClubIntroContext.Provider value={value}>
            {children}
        </ClubIntroContext.Provider>
    );
}

export { ClubIntroProvider, ClubIntroContext };
