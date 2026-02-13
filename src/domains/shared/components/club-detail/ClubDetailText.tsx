interface ClubDetailTextProps {
    text?: string;
}

export default function ClubDetailText({ text }: ClubDetailTextProps) {
    return (
        <span className="text-b4 text-neutral-600 whitespace-pre-wrap">
            {text}
        </span>
    );
}
