interface IActivityImageDTO {
    orderIndex: number;
    imageUrl: string;
}

interface IActivityLogContext {
    postImg: File[];
    setPostImg: React.Dispatch<React.SetStateAction<File[]>>;
    previewImg: string[] | ArrayBuffer;
    setPreviewImg: React.Dispatch<React.SetStateAction<string[] | ArrayBuffer>>;
    currentIdx: number;
    setCurrentIdx: React.Dispatch<React.SetStateAction<number>>;
}

export type { IActivityImageDTO, IActivityLogContext };
