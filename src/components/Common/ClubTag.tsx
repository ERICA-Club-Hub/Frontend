import { cn } from '@/utils/cn';

interface ClubTagProps {
    emoji?: string;
    text?: string;
    backgroundColor: string;
    textColor: string;
}

export default function ClubTag({
    emoji,
    text,
    backgroundColor,
    textColor,
}: ClubTagProps) {
    return (
        <div
            className={cn(
                'px-[5px] py-[2px] flex gap-[3px]',
                'font-medium text-caption leading-[100%]',
                'rounded-[5px] h-[18px] items-center'
            )}
            style={{ backgroundColor, color: textColor }}
        >
            {emoji && <span className="m-0 flex-shrink-0">{emoji}</span>}
            <span className="m-0">{text}</span>
        </div>
    );
}
