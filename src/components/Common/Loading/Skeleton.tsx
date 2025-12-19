export default function Skeleton({
    width,
    height,
}: {
    width: number;
    height: number;
}) {
    return (
        <div
            className="rounded-[10px] animate-[skeleton-loading_0.8s_linear_infinite_alternate]"
            style={{ width: `${width}px`, height: `${height}px` }}
        />
    );
}
