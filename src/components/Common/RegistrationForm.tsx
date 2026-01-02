import { ReactNode } from 'react';
import { cn } from '@/utils/cn';

interface RegistrationGuideTextProps {
    children: ReactNode;
    className?: string;
}

export const RegistrationGuideText = ({
    children,
    className,
}: RegistrationGuideTextProps) => {
    return (
        <p
            className={cn(
                'w-full text-caption font-normal text-neutral-400',
                className
            )}
        >
            {children}
        </p>
    );
};

interface RegistrationInnerWrapperProps {
    children: ReactNode;
    className?: string;
}

export const RegistrationInnerWrapper = ({
    children,
    className,
}: RegistrationInnerWrapperProps) => {
    return (
        <div className={cn('flex flex-col items-center', className)}>
            {children}
        </div>
    );
};

interface RegistrationLabelProps {
    children: ReactNode;
    className?: string;
}

export const RegistrationLabel = ({
    children,
    className,
}: RegistrationLabelProps) => {
    return (
        <label
            className={cn(
                'w-full pl-[7px] mb-[10px] text-body-01 font-semibold text-black',
                className
            )}
        >
            {children}
        </label>
    );
};

interface RegistrationContentProps {
    children: ReactNode;
    className?: string;
}

export const RegistrationContent = ({
    children,
    className,
}: RegistrationContentProps) => {
    return (
        <div
            className={cn(
                'w-[320px] min-w-[47px] h-fit px-[15px] py-[15px] rounded-[10px] text-body-03 font-medium text-black bg-white',
                className
            )}
        >
            {children}
        </div>
    );
};
