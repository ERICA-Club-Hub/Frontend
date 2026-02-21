import { useState } from 'react';

const useUploadImageList = (
    e: React.ChangeEvent<HTMLInputElement>,
    setPostImg: React.Dispatch<React.SetStateAction<File[]>>,
    setPreviewImg: React.Dispatch<React.SetStateAction<string[]>>,
    updateImageOrderIdxList: number[],
    setUpdateImageOrderIdxList: React.Dispatch<React.SetStateAction<number[]>>,
    currentIdx: number,
    mode: string,
) => {
    // 수정 시 이미지 인덱스 순서에 따른 정렬을 위한 상태
    const [updatePostImgInfo, setUpdatePostImgInfo] = useState<
        {
            currentIdx: number;
            image: File;
        }[]
    >([]);

    const { files } = e.target;
    // 업로드한 이미지 추출
    const uploadFile = files![0];

    // 이미지 추가
    if (mode === 'register') setPostImg((prev) => [...prev, ...files!]);
    else if (mode === 'edit') {
        // postImg 상태 초기화 및 오름차순 정렬을 위한 상태 매핑 작업
        setUpdatePostImgInfo((prev) => [
            ...prev,
            { currentIdx, image: uploadFile },
        ]);

        // updatePostImgInfo를 currentIdx가 작은 순서대로 정렬하고, image만 리스트로 필터링하여 setPostImg 업데이트
        const sortedImages = updatePostImgInfo
            .sort((a, b) => a.currentIdx - b.currentIdx)
            .map((item) => item.image);

        setPostImg(sortedImages);

        // 이미지 변경 인덱스 추가
        setUpdateImageOrderIdxList([...updateImageOrderIdxList, currentIdx]);
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

export { useUploadImageList };
