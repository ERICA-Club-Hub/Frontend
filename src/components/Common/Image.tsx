import { convertToCDN } from '@/utils/convertToCDN';

interface ImageProps {
    src?: string;
    alt?: string;
    width: string;
    height: string;
}

export default function Image({ src, alt, width, height }: ImageProps) {
    const cdnUrl = convertToCDN({ src, options: {} });
    if (cdnUrl) {
        return <img src={cdnUrl} alt={alt} width={width} height={height} />;
    } else {
        return <img src={src} alt={alt} width={width} height={height} />;
    }
}
