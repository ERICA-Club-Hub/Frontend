import Skeleton from '@/components/Loading/Skeleton';

interface ClubDetailTextProps {
    text?: string;
    emptyText?: string;
    isLoading?: boolean;
}

export default function ClubDetailText({
    text,
    emptyText,
    isLoading = false,
}: ClubDetailTextProps) {
    if (isLoading) {
        return <Skeleton className="h-4 w-full max-w-75" />;
    }

    if (!text) {
        return <span className="text-b4 text-neutral-600">{emptyText}</span>;
    }

    return <span className="text-b4 text-neutral-600 whitespace-pre-wrap">{text}</span>;
}
