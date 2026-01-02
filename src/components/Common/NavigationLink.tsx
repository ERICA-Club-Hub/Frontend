import { cva } from 'class-variance-authority';
import { cn } from '@/utils/cn';
import { Link } from 'react-router-dom';
import NavigateArrow from '@/assets/common/navigate-arrow.svg?react';

// large: 320 x 45  - 어드민 대시보드에서 사용
// small: 288 x 17  - AppHeader의 NavigationDrawer에서 사용

type Size = 'large' | 'small';

interface NavigationLinkProps {
    children: React.ReactNode;
    url: string;
    size?: Size;
}

const navigationLinkVariants = cva(
    'flex items-center justify-between bg-white text-body-03 font-medium cursor-pointer',
    {
        variants: {
            size: {
                large: 'w-[320px] h-[45px] px-[17px] py-[14px] pl-[17px] pr-[11px] rounded-[10px] text-[#232323]',
                small: 'w-[288px] h-[17px] text-black',
            },
        },
        defaultVariants: {
            size: 'small',
        },
    }
);

const NavigationLink = ({
    children,
    url,
    size = 'small',
}: NavigationLinkProps) => {
    return (
        <Link to={url} className={cn(navigationLinkVariants({ size }))}>
            {children}
            <NavigateArrow
                width={size === 'large' ? '24px' : '15px'}
                height={size === 'large' ? '24px' : '15px'}
            />
        </Link>
    );
};

export { NavigationLink };
