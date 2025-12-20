export default function Skeleton({
    width,
    height,
}: {
    width: number;
    height: number;
}) {
    return (
        <div
            className="rounded-[10px] animate-skeleton-fast"
            style={{ width: `${width}px`, height: `${height}px` }}
        />
    );
}
