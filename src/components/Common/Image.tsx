import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { convertToCDN } from '@/utils/convertToCDN';
import { compressImage } from '@/utils/imageCompression';
import { DEFAULT_IMG } from '@/constants/DEFAULT_IMG';

interface ImageProps {
    src?: string;
    alt?: string;
    width: number;
    height: number;
    quality?: number;
    fallbackSrc?: string;
    className?: string;
}

export default function OptimizedImage({
    src,
    alt = '이미지',
    width,
    height,
    quality = 80,
    fallbackSrc = DEFAULT_IMG,
    className,
}: ImageProps) {
    const [finalSrc, setFinalSrc] = useState<string>(fallbackSrc);
    const [hasError, setHasError] = useState<boolean>(false);
    const [retryAttempted, setRetryAttempted] = useState<boolean>(false);

    // CDN
    useEffect(() => {
        const loadOptimizedImage = async () => {
            if (!src || src.trim() === '') {
                setFinalSrc(fallbackSrc);
                return;
            }

            setHasError(false);
            setRetryAttempted(false);

            try {
                const cdnUrl = convertToCDN({
                    src,
                    options: { width, height, quality },
                });

                if (cdnUrl) {
                    try {
                        const img = new Image();
                        await new Promise<void>((resolve, reject) => {
                            img.onload = () => resolve();
                            img.onerror = reject;
                            img.src = cdnUrl;
                        });
                        setFinalSrc(cdnUrl);
                        return;
                    } catch {
                        //
                    }
                }
                await tryFallbackMethods();
            } finally {
                //
            }
        };

        loadOptimizedImage();
    }, [src, width, height, quality, fallbackSrc]);

    // CDN 실패했을 때 or 원본 잘못됐을 때(onError 시에)대체 최적화 로직
    const tryFallbackMethods = async () => {
        if (!src) {
            setFinalSrc(fallbackSrc);
            return;
        }

        try {
            const response = await fetch(src);
            if (!response.ok) throw new Error('이미지 fetch 실패');

            const blob = await response.blob();
            const file = new File([blob], 'image.jpg', {
                type: blob.type,
            });

            const compressedFile = await compressImage(file, quality, width);

            if (compressedFile) {
                const compressedUrl = URL.createObjectURL(compressedFile);
                setFinalSrc(compressedUrl);
                return;
            }
        } catch (error) {
            console.error('클라이언트 압축 실패:', error);
        }

        try {
            const img = new Image();
            await new Promise<void>((resolve, reject) => {
                img.onload = () => resolve();
                img.onerror = reject;
                img.src = src;
            });

            setFinalSrc(src);
            return;
        } catch (error) {
            console.error('원본 이미지 로드 실패:', error);
        }

        setFinalSrc(fallbackSrc);
    };

    // onError 처리
    const handleImageError = async () => {
        if (hasError || retryAttempted) return;

        setHasError(true);
        setRetryAttempted(true);

        await tryFallbackMethods();
    };

    return (
        <ImageContainer>
            <StyledImage
                src={finalSrc}
                alt={alt}
                width={width}
                height={height}
                className={className}
                onError={handleImageError}
            />
        </ImageContainer>
    );
}

const ImageContainer = styled.div`
    position: relative;
`;

const StyledImage = styled.img<{ width: number; height: number }>`
    width: ${({ width }) => width}px;
    height: ${({ height }) => height}px;
    object-fit: cover;
`;
