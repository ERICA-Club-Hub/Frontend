import styled from 'styled-components';
import { ImageListUpload } from '@/components/Common/ImageUpload';
import PlusIcon from '@/assets/common/plus-icon.svg?react';
import ArrowIcon from '@/assets/common/Expand_right.svg?react';
import useActivityLogContext from '@/hooks/contexts/useActivityLogContext';

export default function CarouselImage() {
    const {
        postImg,
        previewImg,
        setPreviewImg,
        currentIdx,
        setCurrentIdx,
        mode,
        isEditBtnClicked,
    } = useActivityLogContext();

    // 캐러셀 이미지 이전, 다음 버튼 클릭
    const handleClickPrevArrow = () => {
        if (postImg && currentIdx > 0) {
            setCurrentIdx(currentIdx - 1);
        }
    };
    const handleClickNextArrow = () => {
        // 수정모드에서 '수정하기' 버튼이 눌리지 않은 상황에서는 NEW 이미지 추가 제한
        if (
            mode === 'edit' &&
            !isEditBtnClicked &&
            Array.isArray(postImg) &&
            currentIdx === postImg.length - 1
        ) {
            return;
        }

        // 수정하기에서 이미지 추가 API 없다고 해서 일단 수정모드일 때 이미지 추가 막아놓기
        // 수정하기에서 이미지 추가 API 있으면 이 부분 삭제
        if (
            mode === 'edit' &&
            Array.isArray(postImg) &&
            currentIdx === postImg.length - 1
        ) {
            return;
        }

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
                {/* 이미지 업로드 컴포넌트 */}
                <ImageListUpload />

                {/* 이미지 없을 때 플러스 아이콘 */}
                {Array.isArray(postImg) && postImg[currentIdx] ? null : (
                    <IconWrapper>
                        <PlusIcon width={24} height={24} strokeWidth={2} />
                    </IconWrapper>
                )}
            </ThumbnailImageWrapper>

            <NextArrow
                onClick={handleClickNextArrow}
                // 여기 eidt 모드일 때 코드 수정
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
