import { cn } from '@/utils/cn';

interface SkeletonProps {
    className?: string;
    circle?: boolean;
}

export default function Skeleton({ className, circle }: SkeletonProps) {
    return (
        <div
            className={cn(
                'bg-neutral-200 animate-pulse',
                circle ? 'rounded-full' : 'rounded-sm',
                className,
            )}
        />
    );
}
