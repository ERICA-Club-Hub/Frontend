import { ReactNode } from 'react';
import { cn } from '@/utils/cn';

interface AdminSectionProps {
    children: ReactNode;
    className?: string;
}

export const AdminSection = ({ children, className }: AdminSectionProps) => {
    return (
        <section
            className={cn(
                'flex flex-col justify-center items-center w-[320px] px-5 rounded-[10px] bg-white',
                className
            )}
        >
            {children}
        </section>
    );
};

interface AdminSectionLabelProps {
    children: ReactNode;
    className?: string;
    style?: React.CSSProperties;
}

export const AdminSectionLabel = ({
    children,
    className,
    style,
}: AdminSectionLabelProps) => {
    return (
        <h3
            className={cn('w-full text-body-01 font-semibold text-black', className)}
            style={style}
        >
            {children}
        </h3>
    );
};

interface AdminButtonGroupProps {
    children: ReactNode;
    className?: string;
}

export const AdminButtonGroup = ({
    children,
    className,
}: AdminButtonGroupProps) => {
    return (
        <div
            className={cn('flex justify-end gap-[5px] mb-[26px]', className)}
        >
            {children}
        </div>
    );
};
