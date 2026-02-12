import { cn } from '@/utils/cn';

interface SkeletonProps {
    className?: string;
    circle?: boolean;
}

export default function Skeleton({ className, circle }: SkeletonProps) {
    return (
        <div
            className={cn(
                'animate-skeleton-fast',
                circle ? 'rounded-full' : 'rounded-sm',
                className,
            )}
        />
    );
}
