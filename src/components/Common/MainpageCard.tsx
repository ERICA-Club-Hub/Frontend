import { cn } from '@/utils/cn';
import { Tag } from './Tag';

interface MainpageCardProps {
    title: string;
    subtitle: string;
    tags?: Array<{
        type: '동아리 및 질문' | '모집중' | '모집마감' | '모집예정';
        text: string;
    }>;
    onClick?: () => void;
}

const MainpageCard = ({
    title,
    subtitle,
    tags = [],
    onClick,
}: MainpageCardProps) => {
    return (
        <button
            onClick={onClick}
            type="button"
            className={cn(
                'flex w-[320px] h-[70px] px-[15px] py-[15px]',
                'flex-col items-start justify-center gap-[4.5px]',
                'flex-shrink-0 rounded-[10px]',
                'border border-[#EAEAEA] bg-white',
                'cursor-pointer text-left',
                'hover:bg-[#F7F7F7]',
            )}
        >
            <div className="flex items-center gap-[6px] w-full justify-between">
                <div className="w-[160px] text-[#232323] text-body-01 font-semibold leading-normal">
                    {title}
                </div>
                <div className="flex gap-[6px]">
                    {tags.map((tag, index) => (
                        <Tag key={index} type={tag.type}>
                            {tag.text}
                        </Tag>
                    ))}
                </div>
            </div>
            <div className="self-stretch text-neutral-600 text-small font-medium leading-normal">
                {subtitle}
            </div>
        </button>
    );
};

export default MainpageCard;
