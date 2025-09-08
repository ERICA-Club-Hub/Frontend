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
}

export default function OptimizedImage({
    src,
    alt = '이미지',
    width,
    height,
    quality = 80,
    fallbackSrc = DEFAULT_IMG,
}: ImageProps) {
    const [finalSrc, setFinalSrc] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        const loadOptimizedImage = async () => {
            if (!src || src.trim() === '') {
                setFinalSrc(fallbackSrc);
                return;
            }

            setIsLoading(true);

            try {
                // CDN 시도
                const cdnUrl = convertToCDN({
                    src,
                    options: { width, height, quality },
                });

                if (cdnUrl) {
                    setFinalSrc(cdnUrl);
                    return;
                }

                // CDN 실패했을 때만 클라이언트 압축
                try {
                    const response = await fetch(src);
                    if (!response.ok) throw new Error('이미지 fetch 실패');

                    const blob = await response.blob();

                    const file = new File([blob], 'image.jpg', {
                        type: blob.type,
                    });

                    const compressedFile = await compressImage(
                        file,
                        quality,
                        width,
                    );

                    if (compressedFile) {
                        const compressedUrl =
                            URL.createObjectURL(compressedFile);
                        setFinalSrc(compressedUrl);
                        return;
                    }
                } catch (error) {
                    console.error('클라이언트 압축 실패:', error);
                }

                // 압축도 실패했을 때만 원본 시도
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
            } finally {
                setIsLoading(false);
            }
        };

        loadOptimizedImage();

        return () => {
            if (finalSrc && finalSrc.startsWith('blob:')) {
                URL.revokeObjectURL(finalSrc);
            }
        };
    }, [src, width, height, quality, fallbackSrc]);

    if (isLoading) {
        return (
            <LoadingContainer width={width} height={height}>
                <LoadingText>로딩 중...</LoadingText>
            </LoadingContainer>
        );
    }

    return (
        <ImageContainer>
            <StyledImage
                src={finalSrc}
                alt={alt}
                width={width}
                height={height}
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

const LoadingContainer = styled.div<{ width: number; height: number }>`
    width: ${({ width }) => width}px;
    height: ${({ height }) => height}px;
    background-color: #f3f4f6;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #e5e7eb;
    border-radius: 4px;
`;

const LoadingText = styled.span`
    font-size: 12px;
    color: #6b7280;
`;
