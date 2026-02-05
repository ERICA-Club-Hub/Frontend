import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/cn';
import { TabContext, useTabContext } from './TabContext';

/**
 * Tab 컴포넌트의 variants 정의
 * - count: 탭 개수에 따라 레이아웃 변경 (3개: gap-[60px], 4개: gap-[22.67px] justify-center)
 */
const tabContainerVariants = cva(
    'border-b-2 border-neutral-100 flex items-center pt-3 px-5 w-full',
    {
        variants: {
            count: {
                3: 'gap-[60px] justify-center',
                4: 'gap-[22.67px] justify-center',
            },
        },
        defaultVariants: {
            count: 3,
        },
    },
);

const tabItemVariants = cva(
    'flex items-center justify-center relative cursor-pointer h-full',
    {
        variants: {
            isActive: {
                true: 'text-primary-600',
                false: 'text-neutral-900',
            },
        },
    },
);

const tabTextVariants = cva('transition-all duration-200 ease-in-out', {
    variants: {
        isActive: {
            true: 'text-b3 text-primary-600',
            false: 'text-b4 text-neutral-900',
        },
    },
    defaultVariants: {
        isActive: false,
    },
});

/**
 * Tab Item Props
 */
interface TabItemProps {
    /** 탭 식별자 */
    tabKey: string;
    /** 탭에 표시될 텍스트 */
    children: React.ReactNode;
    /** 비활성화 여부 */
    disabled?: boolean;
    /** 추가 CSS 클래스 */
    className?: string;
}

/**
 * Tab Container Props
 */
interface TabContainerProps extends VariantProps<typeof tabContainerVariants> {
    /** 자식 요소 (TabItem들) */
    children: React.ReactNode;
    /** 추가 CSS 클래스 */
    className?: string;
    /** 배경색 (기본: transparent) */
    backgroundColor?: string;
    /**  현재 활성 탭 값 */
    value: string;
    /**  변경 핸들러 */
    onChange: (value: string) => void;
}

/**
 * 개별 탭 아이템 컴포넌트
 */
const TabItem = ({
    tabKey,
    children,
    disabled = false,
    className,
}: TabItemProps) => {
    const { value, onChange } = useTabContext();
    const isActive = value === tabKey;

    const handleClick = () => {
        if (!disabled && onChange) onChange(tabKey);
    };

    return (
        <button
            role="tab"
            aria-selected={isActive}
            aria-disabled={disabled}
            disabled={disabled}
            onClick={handleClick}
            className={cn(
                tabItemVariants({ isActive }),
                disabled && 'cursor-not-allowed opacity-50',
                className,
            )}
        >
            <span className={tabTextVariants({ isActive })}>{children}</span>
            {isActive && (
                <div className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-primary-600 z-10" />
            )}
        </button>
    );
};

/**
 * Tab Container 컴포넌트
 *
 * @example
 * ```tsx
 * // 3개 탭 (동아리 상세 페이지)
 * <Tab count={3}>
 *   <Tab.Item tabKey="intro" activeTab={activeTab} onTabChange={setActiveTab}>
 *     동아리소개
 *   </Tab.Item>
 *   <Tab.Item tabKey="schedule" activeTab={activeTab} onTabChange={setActiveTab}>
 *     연간일정
 *   </Tab.Item>
 *   <Tab.Item tabKey="recruit" activeTab={activeTab} onTabChange={setActiveTab}>
 *     모집정보
 *   </Tab.Item>
 * </Tab>
 *
 * // 4개 탭 (메인 페이지)
 * <Tab count={4}>
 *   <Tab.Item tabKey="central" activeTab={activeTab} onTabChange={setActiveTab}>
 *     중앙동아리
 *   </Tab.Item>
 *   <Tab.Item tabKey="college" activeTab={activeTab} onTabChange={setActiveTab}>
 *     단과대동아리
 *   </Tab.Item>
 *   <Tab.Item tabKey="department" activeTab={activeTab} onTabChange={setActiveTab}>
 *     학과동아리
 *   </Tab.Item>
 *   <Tab.Item tabKey="union" activeTab={activeTab} onTabChange={setActiveTab}>
 *     연합동아리
 *   </Tab.Item>
 * </Tab>
 * ```
 */
const TabContainer = ({
    children,
    count,
    className,
    backgroundColor = 'transparent',
    value,
    onChange,
}: TabContainerProps) => {
    return (
        <TabContext.Provider value={{ value, onChange }}>
            <div
                role="tablist"
                className={cn(tabContainerVariants({ count }), className)}
                style={{ backgroundColor }}
            >
                {children}
            </div>
        </TabContext.Provider>
    );
};

TabContainer.Item = TabItem;
const Tab = TabContainer;

export default Tab;
