import ArrowIcon from '@/assets/common/Expand_right.svg?react';
import useActivityLogContext from '@/domains/club/activity/contexts/useActivityLogContext';
import ImageListUpload from '@/components/ImageUpload/ImageListUpload';

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
        <div className="relative flex items-center gap-[10px] w-[278px] mb-[10px]">
            <button
                onClick={handleClickPrevArrow}
                disabled={currentIdx === 0}
                className="cursor-pointer p-0"
            >
                <ArrowIcon width={24} height={24} />
            </button>

            <div className="relative w-[210px] h-[210px] cursor-pointer rounded-[5px]">
                {/* 이미지 업로드  */}
                <ImageListUpload />

                {/* 이미지 없을 때 플러스 아이콘 */}
                {Array.isArray(postImg) && postImg[currentIdx] ? null : (
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer">
                        {/* 아이콘 추가 */}
                    </div>
                )}
            </div>

            <button
                onClick={handleClickNextArrow}
                // 여기 eidt 모드일 때 코드 수정
                disabled={postImg.length === 0}
                className="cursor-pointer p-0 rotate-180"
            >
                <ArrowIcon width={24} height={24} strokeWidth={2} />
            </button>
        </div>
    );
}
