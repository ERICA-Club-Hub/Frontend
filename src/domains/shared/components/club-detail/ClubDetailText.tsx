import Skeleton from '@/components/Loading/Skeleton';

interface ClubDetailTextProps {
    text?: string;
    emptyText?: string;
}

export default function ClubDetailText({
    text,
    emptyText,
}: ClubDetailTextProps) {
    if (text === undefined) {
        return <Skeleton className="h-4 w-full max-w-75" />;
    }

    if (text === '' || text === null) {
        return <span className="text-b4 text-neutral-600">{emptyText}</span>;
    }

    return <span className="text-b4 text-neutral-600">{text}</span>;
}
