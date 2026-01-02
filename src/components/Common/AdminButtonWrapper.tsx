import { ReactNode } from 'react';
import { cn } from '@/utils/cn';

interface AdminButtonWrapperProps {
    children: ReactNode;
    className?: string;
}

export const AdminButtonWrapper = ({
    children,
    className,
}: AdminButtonWrapperProps) => {
    return (
        <div
            className={cn(
                'w-[320px] flex justify-end items-center gap-[5px]',
                className
            )}
        >
            {children}
        </div>
    );
};
