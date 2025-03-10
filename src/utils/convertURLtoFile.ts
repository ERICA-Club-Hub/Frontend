const convertURLtoFile = async (imageUrl: string) => {
    try {
        // 이미지 URL을 통해 이미지를 가져옴
        const res = await fetch(`${imageUrl}`, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Cache-Control': 'no-cache',
            },
        });

        // 응답을 Blob 객체로 변환
        const blob = await res.blob();

        const decodedUrl = decodeURIComponent(imageUrl);

        // // URL에서 파일 이름 추출
        const fileNameWithoutAddress = decodedUrl.split('/')[3] || ''; // 마지막 부분에서 쿼리스트링 제거
        const fileNameWithUUID = fileNameWithoutAddress.split('?')[0];
        const fileName = fileNameWithUUID.replace(/^[a-z0-9-]{36}/, '');

        // Blob 객체를 File 객체로 변환
        return new File([blob], fileName, {
            type: blob.type,
        });
    } catch (error) {
        console.error('이미지 파일로 변환 실패', error);
    }
};

export default convertURLtoFile;
