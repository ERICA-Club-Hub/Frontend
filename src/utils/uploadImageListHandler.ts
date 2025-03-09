const uploadImageListHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
    setPostImg: React.Dispatch<React.SetStateAction<File[]>>,
    setPreviewImg: React.Dispatch<React.SetStateAction<string[] | ArrayBuffer>>,
    currentIdx: number,
) => {
    const { files } = e.target;
    // 이미지 추가
    setPostImg((prev) => [...prev, ...files!]);

    // 업로드한 이미지 추출
    const uploadFile = files![0];

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

export { uploadImageListHandler };
