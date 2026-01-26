import { cn } from '@/utils/cn';

interface TabItemProps {
    tabKey: string;
    children: React.ReactNode;
    disabled?: boolean;
    className?: string;
    activeTab: string;
    onTabChange: (tabKey: string) => void;
}

interface TabContainerProps {
    children: React.ReactNode;
    width?: string;
    className?: string;
    backgroundColor?: string;
}

const TabItem = ({
    tabKey,
    children,
    disabled = false,
    className,
    activeTab,
    onTabChange,
}: TabItemProps) => {
    const isActive = activeTab === tabKey;

    return (
        <button
            onClick={() => !disabled && onTabChange(tabKey)}
            disabled={disabled}
            className={cn(
                'flex-1 w-auto pt-[24px]',
                'border-0 bg-transparent cursor-pointer',
                'flex justify-center items-end',
                'transition-all duration-200 ease-in-out',
                'hover:opacity-80',
                'disabled:cursor-not-allowed disabled:opacity-100',
                className
            )}
        >
            <span
                className={cn(
                    'inline-block pb-[7px]',
                    'border-b-2 text-black text-body-03',
                    'transition-all duration-200 ease-in-out',
                    isActive
                        ? 'border-badge-blue-text font-semibold'
                        : 'border-transparent font-normal',
                    disabled && 'text-[#cccccc]'
                )}
            >
                {children}
            </span>
        </button>
    );
};

const TabContainer = ({
    children,
    width = '320px',
    className,
    backgroundColor = 'transparent',
}: TabContainerProps) => {
    return (
        <div
            className={cn('h-[47px] flex mb-[9px] justify-center', className)}
            style={{ width, backgroundColor }}
        >
            {children}
        </div>
    );
};

TabContainer.Item = TabItem;
const Tab = TabContainer;

export default Tab;
