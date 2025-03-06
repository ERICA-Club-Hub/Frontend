const convertImageToFile = async (imageUrl: string) => {
    try {
        // 이미지 URL을 통해 이미지를 가져옴
        const res = await fetch(imageUrl);

        // 응답을 Blob 객체로 변환
        const blob = await res.blob();

        // Blob 객체를 File 객체로 변환
        return new File([blob], 'profile-image.jpg', {
            type: blob.type,
        });
    } catch (error) {
        console.error('이미지 파일로 변환 실패', error);
    }
};

export default convertImageToFile;
