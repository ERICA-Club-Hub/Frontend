interface ConversionOptions {
    width?: number;
    height?: number;
    quality?: number;
}

interface convertToCDNProps {
    src?: string;
    options?: ConversionOptions;
}

export const convertToCDN = ({
    src,
    options = {},
}: convertToCDNProps): string | false => {
    try {
        if (!src || src.startsWith('data:')) return false;

        const { width, height, quality = 80 } = options;

        let convertedUrl = `https://images.weserv.nl/?url=${encodeURIComponent(
            src,
        )}&output=webp&q=${quality}`;

        if (width) convertedUrl += `&w=${width}`;
        if (height) convertedUrl += `&h=${height}`;

        return convertedUrl;
    } catch {
        return false;
    }
};
