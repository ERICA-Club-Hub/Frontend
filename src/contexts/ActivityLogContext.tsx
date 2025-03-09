import { createContext, ReactNode } from 'react';
import { IActivityLogContext } from '@/types/activity-log.types';

interface IActivityLogValue {
    children: ReactNode;
    value: IActivityLogContext;
}

const ActivityLogContext = createContext<IActivityLogContext | null>(null);

function ActivityLogProvider({ children, value }: IActivityLogValue) {
    return (
        <ActivityLogContext.Provider value={value}>
            {children}
        </ActivityLogContext.Provider>
    );
}

export { ActivityLogProvider, ActivityLogContext };
