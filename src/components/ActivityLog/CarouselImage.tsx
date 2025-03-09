import styled from 'styled-components';
import { ImageListUpload } from '@/components/Common/ImageUpload';
import PlusIcon from '@/assets/common/plus-icon.svg?react';
import ArrowIcon from '@/assets/common/Expand_right.svg?react';
import useActivityLogContext from '@/hooks/contexts/useClubIntroContext';

export default function CarouselImage() {
    const {
        postImg,
        setPostImg,
        previewImg,
        setPreviewImg,
        currentIdx,
        setCurrentIdx,
    } = useActivityLogContext();

    // 캐러셀 이미지 이전, 다음 버튼 클릭
    const handleClickPrevArrow = () => {
        if (postImg && currentIdx > 0) {
            setCurrentIdx(currentIdx - 1);
        }
    };
    const handleClickNextArrow = () => {
        // NEW 이미지 추가
        if (Array.isArray(postImg) && currentIdx === postImg.length - 1) {
            setCurrentIdx(currentIdx + 1);
            if (Array.isArray(previewImg)) {
                setPreviewImg([...previewImg, '']);
            }
        }

        // 이미지 있을 때 다음 이미지 보여주기
        if (Array.isArray(postImg) && currentIdx < postImg.length - 1) {
            setCurrentIdx(currentIdx + 1);
        }
    };

    return (
        <ImageCarouselWrapper>
            <PrevArrow
                onClick={handleClickPrevArrow}
                disabled={currentIdx === 0}
            >
                <ArrowIcon width={24} height={24} />
            </PrevArrow>
            <ThumbnailImageWrapper>
                <ImageListUpload
                    currentIdx={currentIdx}
                    setPostImg={setPostImg}
                    previewImg={previewImg}
                    setPreviewImg={setPreviewImg}
                />
                {Array.isArray(postImg) && postImg[currentIdx] ? null : (
                    <IconWrapper>
                        <PlusIcon width={24} height={24} strokeWidth={2} />
                    </IconWrapper>
                )}
            </ThumbnailImageWrapper>
            <NextArrow
                onClick={handleClickNextArrow}
                disabled={postImg.length === 0}
            >
                <ArrowIcon width={24} height={24} strokeWidth={2} />
            </NextArrow>
        </ImageCarouselWrapper>
    );
}

const PrevArrow = styled.button``;
const NextArrow = styled.button``;

const ImageCarouselWrapper = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    gap: 10px;
    width: 278px;
    margin-bottom: 10px;

    ${PrevArrow}, ${NextArrow} {
        cursor: pointer;
        padding: 0px;
    }

    ${NextArrow} {
        transform: rotate(180deg);
    }
`;

const ThumbnailImageWrapper = styled.div`
    position: relative;
    width: 210px;
    height: 210px;
    cursor: pointer;
    border-radius: 5px;
`;

const IconWrapper = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    cursor: pointer;
`;
