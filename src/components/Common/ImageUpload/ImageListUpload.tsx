import useActivityLogContext from '@/hooks/contexts/useActivityLogContext';
import styled from 'styled-components';

function ImageListUpload() {
    const {
        postImg,
        setPostImg,
        previewImg,
        setPreviewImg,
        setUpdateImageOrderIdxList,
        currentIdx,
        mode,
        isEditBtnClicked,
    } = useActivityLogContext();

    const handleImgUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { files } = e.target;
        // 업로드한 이미지 객체로 추출
        const uploadFile = files![0];

        // 이미지가 추가됐을 때
        if (currentIdx > postImg.length - 1 && uploadFile) {
            setPostImg((prev) => [...prev, ...files!]);
        } else if (currentIdx <= postImg.length - 1 && uploadFile) {
            // 기존 이미지가 수정됐을 때
            setPostImg((prev) => {
                const updatedList = [...prev];
                updatedList[currentIdx] = uploadFile;
                return updatedList;
            });
        }
        // 수정모드일 때
        if (mode === 'edit') {
            // 수정 시의 이미지 및 인덱스 정보 저장 -> 오름차순 정렬
            setUpdateImageOrderIdxList((prev) => {
                const sortedImages = [
                    ...prev,
                    { currentIdx, image: uploadFile },
                ].sort((a, b) => a.currentIdx - b.currentIdx);
                return sortedImages;
            });
        }

        // 미리보기 이미지 설정
        let fileRead = new FileReader();
        fileRead.readAsDataURL(uploadFile); // 미리보기용 url로 변환

        fileRead.onload = () => {
            setPreviewImg((prev) => {
                if (Array.isArray(prev)) {
                    let updatedList = [...prev];
                    updatedList[currentIdx] = fileRead.result as string;
                    return updatedList;
                }
                return prev;
            });
        };

        fileRead.onerror = () => {
            console.log('이미지 읽기 중 오류 발생');
        };
    };

    return (
        <ImageContainer>
            <label htmlFor="image" className="image-preview-label">
                {Array.isArray(previewImg) && previewImg[currentIdx] ? (
                    <ImagePreview
                        src={previewImg[currentIdx] as string}
                        alt="image-preview"
                    />
                ) : null}
            </label>
            <input
                id="image"
                type="file"
                accept=".jpg, .jpeg, .png"
                onChange={handleImgUpload}
                disabled={mode === 'edit' && !isEditBtnClicked}
            />
        </ImageContainer>
    );
}

export { ImageListUpload };

const ImageContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;

    .image-preview-label {
        width: 100%;
        height: 100%;
        border-radius: 10px;
        background-color: ${({ theme }) => theme.colors.mediumGray};
        cursor: pointer;
    }

    input {
        display: none;
    }
`;

const ImagePreview = styled.img`
    width: 100%;
    height: 100%;
    border-radius: 10px;
    object-fit: cover;
`;
