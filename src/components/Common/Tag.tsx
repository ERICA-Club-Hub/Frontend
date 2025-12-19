import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/cn';

interface TagProps {
    type?: '동아리 및 질문' | '모집중' | '모집마감' | '모집예정';
}

const tagVariants = cva(
    'inline-flex px-[5px] py-[2px] items-center gap-[3px] rounded-[5px] text-caption font-medium leading-normal whitespace-nowrap overflow-hidden text-ellipsis max-w-[100px]',
    {
        variants: {
            type: {
                '동아리 및 질문': 'bg-badge-blue-bg text-badge-blue-text',
                '모집중': 'bg-badge-orange-bg text-sub-orange',
                '모집마감': 'bg-badge-gray-bg text-gray-600',
                '모집예정': 'bg-badge-green-bg text-badge-green-text',
            },
        },
        defaultVariants: {
            type: '동아리 및 질문',
        },
    }
);

const Tag = ({ type, children }: React.PropsWithChildren<TagProps>) => {
    return <div className={cn(tagVariants({ type }))}>{children}</div>;
};

export { Tag };
