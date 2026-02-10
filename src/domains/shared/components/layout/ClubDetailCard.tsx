interface ClubDetailCardProps {
    title: string;
    children: React.ReactNode;
}

export default function ClubDetailCard({
    title,
    children,
}: ClubDetailCardProps) {
    return (
        <section className="px-5 py-4.5 bg-neutral-00 flex flex-col gap-3 rounded-lg w-[320px]">
            <h3 className="text-b2">{title}</h3>
            {children}
        </section>
    );
}
