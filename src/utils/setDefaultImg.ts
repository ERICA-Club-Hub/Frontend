import { useEffect } from 'react';

export const setDefaultImg = ({
    postImg,
    setPostImg,
}: {
    postImg: File | File[] | null;
    setPostImg: React.Dispatch<React.SetStateAction<File | File[] | null>>;
}) => {
    // postImg 기본 이미지로 설정
    useEffect(() => {
        if (!postImg) {
            fetch('/placeholder-image.svg')
                .then((res) => res.blob())
                .then((blob) => {
                    const file = new File([blob], 'placeholder-image', {
                        type: 'image/svg+xml',
                    });
                    setPostImg(file);
                });
        }
    }, [postImg]);
};
