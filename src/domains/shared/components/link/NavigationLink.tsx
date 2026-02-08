import { cva } from 'class-variance-authority';
import { cn } from '@/utils/cn';
import { Link, LinkProps } from 'react-router-dom';
import NavigateArrow from '@/assets/common/navigate-arrow.svg?react';

interface NavigationLinkProps extends LinkProps {
    content: {
        label: string;
        description?: string;
    };
    type?: 'clubAdmin' | 'serviceAdmin';
}

/**
 * 네비게이션 링크 컴포넌트
 * @param type- 네비게이션이 사용되는 컨텍스트
 * @usage 동아리 어드민 대시보드 페이지, 서비스 어드민 대시보드 페이지
 */
export default function NavigationLink({
    content,
    type = 'clubAdmin',
    className,
    ...props
}: NavigationLinkProps) {
    return (
        <Link
            className={cn(navigationLinkVariants({ type }), className)}
            {...props}
        >
            <div className="flex flex-col flex-1 gap-[2px]">
                <strong
                    className={cn(
                        'text-neutral-900',
                        type === 'clubAdmin' ? 'text-b3 ' : 'text-b4',
                    )}
                >
                    {content.label}
                </strong>
                {content.description && (
                    <p className="text-c1 text-neutral-400">
                        {content.description}
                    </p>
                )}
            </div>
            <NavigateArrow width="22px" height="22px" />
        </Link>
    );
}

const navigationLinkVariants = cva(
    'flex items-center justify-between cursor-pointer',
    {
        variants: {
            type: {
                clubAdmin:
                    'w-[360px] h-[63px] px-[20px] py-[12px] bg-transparent',
                serviceAdmin:
                    'w-[320px] h-[46px] p-[12px] border-[0.6px] border-solid border-neutral-150 rounded-[8px] bg-neutral-00 px-4',
            },
        },
        defaultVariants: {
            type: 'clubAdmin',
        },
    },
);
