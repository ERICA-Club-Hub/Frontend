interface IActivityImageDTO {
    orderIndex: number;
    imageUrl: string;
}

type IupdateImageOrderIdxList = {
    currentIdx: number;
    image: File;
};

interface IActivityLogContext {
    postImg: File[];
    setPostImg: React.Dispatch<React.SetStateAction<File[]>>;
    previewImg: string[];
    setPreviewImg: React.Dispatch<React.SetStateAction<string[]>>;
    currentIdx: number;
    setCurrentIdx: React.Dispatch<React.SetStateAction<number>>;
    mode: string;
    isEditBtnClicked: boolean;
}

export type {
    IActivityImageDTO,
    IupdateImageOrderIdxList,
    IActivityLogContext,
};
