import { ReactNode } from 'react';
import { cn } from '@/utils/cn';

interface CategoryCollectProps {
    img: ReactNode;
    categoryLabel: string;
    onClick?: () => void;
}

export default function CategoryCollect({
    img,
    categoryLabel,
    onClick,
}: CategoryCollectProps) {
    return (
        <div className="flex flex-col items-center justify-center gap-[10px]">
            <button
                onClick={onClick}
                className={cn(
                    'w-[66px] h-[66px] rounded-[10px] bg-white',
                    'flex items-center justify-center'
                )}
            >
                {img}
            </button>
            <span className="font-medium text-caption text-gray-600">
                {categoryLabel}
            </span>
        </div>
    );
}
