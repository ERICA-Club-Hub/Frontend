import { cn } from '@/utils/cn';

export default function Spinner() {
    return (
        <span
            className={cn(
                'animate-spin inline-block rounded-full',
                'w-[21px] h-[21px]',
                'bg-[conic-gradient(from_0deg,rgba(249,250,251,0)_0%,#F9FAFB_100%)]',
            )}
            style={{
                mask: 'radial-gradient(farthest-side, transparent calc(100% - 2px), black calc(100% - 2px))',
                WebkitMask:
                    'radial-gradient(farthest-side, transparent calc(100% - 2px), black calc(100% - 2px))',
            }}
            aria-hidden="true"
        />
    );
}
