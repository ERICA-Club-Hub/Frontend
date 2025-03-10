const convertImageToFile = async (imageUrl: string) => {
    try {
        // 이미지 URL을 통해 이미지를 가져옴
        const res = await fetch(imageUrl, {
            method: 'GET',
        });

        // 응답을 Blob 객체로 변환
        const blob = await res.blob();

        // // URL에서 파일 이름 추출
        const urlSegments = imageUrl.split('/');
        const fileName = urlSegments[urlSegments.length - 1];

        // Blob 객체를 File 객체로 변환
        return new File([blob], fileName, {
            type: blob.type,
        });
    } catch (error) {
        console.error('이미지 파일로 변환 실패', error);
    }
};

export default convertImageToFile;
