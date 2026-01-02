import useActivityLogContext from '@/hooks/contexts/useActivityLogContext';
import { cn } from '@/utils/cn';

function ImageListUpload() {
    const {
        postImg,
        setPostImg,
        previewImg,
        setPreviewImg,
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
            setPostImg([...postImg, ...files!]);
        } else if (currentIdx <= postImg.length - 1 && uploadFile) {
            // 기존 이미지가 수정됐을 때
            setPostImg((postImg) => {
                const updatedList = [...postImg];
                updatedList[currentIdx] = uploadFile;
                return updatedList;
            });
        }

        // 미리보기 이미지 설정
        let fileRead = new FileReader();
        fileRead.readAsDataURL(uploadFile); // 미리보기용 url로 변환
        console.log(fileRead.result);

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
        <div className="w-full h-full flex">
            <label
                htmlFor="image"
                className={cn(
                    'w-full h-full rounded-[10px]',
                    'bg-neutral-200 cursor-pointer'
                )}
            >
                {Array.isArray(previewImg) && previewImg[currentIdx] ? (
                    <img
                        src={previewImg[currentIdx] as string}
                        alt="image-preview"
                        className="w-full h-full rounded-[10px] object-cover"
                    />
                ) : null}
            </label>
            <input
                id="image"
                type="file"
                accept=".jpg, .jpeg, .png"
                onChange={handleImgUpload}
                disabled={mode === 'edit' && !isEditBtnClicked}
                className="hidden"
            />
        </div>
    );
}

export { ImageListUpload };
