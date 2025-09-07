import { DEFAULT_IMG } from '@/constants/DEFAULT_IMG';

interface ImageProps {
    src?: string;
    alt?: string;
    width: number;
    height: number;
    quality?: number;
    fallbackSrc?: string;
}

export default function OptimizedImageProps({
    src,
    alt = '이미지',
    width,
    height,
    quality = 80,
    fallbackSrc = DEFAULT_IMG,
}: ImageProps) {
    return <div></div>;
}
