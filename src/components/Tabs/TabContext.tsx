import { createContext, useContext } from 'react';

interface TabContextProps {
    value?: string;
    onChange?: (value: string) => void;
}

export const TabContext = createContext<TabContextProps | null>(null);

export const useTabContext = () => {
    const context = useContext(TabContext);
    if (!context)
        throw new Error('Tab.Item은 Tab 컴포넌트 내부에서 사용되어야 합니다.');
    return context;
};
