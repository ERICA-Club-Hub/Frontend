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

        // URL 디코딩 및 쿼리 스트링 제거
        const decodedUrl = decodeURIComponent(imageUrl);
        const urlWithoutQuery = decodedUrl.split('?')[0];

        // URL에서 파일 이름 추출
        let fileName =
            urlWithoutQuery.split('/').pop() || 'placeholder-image.svg';

        // 파일 이름에서 UUID 패턴 제거
        const uuidPattern = /^[a-z0-9-]{36}/;
        if (uuidPattern.test(fileName)) {
            fileName = fileName.replace(uuidPattern, '');
        }

        if (!fileName || fileName.trim() === '') {
            fileName = 'placeholder-image.svg';
        }

        // Blob 객체를 File 객체로 변환
        return new File([blob], fileName, {
            type: blob.type,
        });
    } catch (error) {
        console.error('이미지 파일로 변환 실패', error);
    }
};

export default convertURLtoFile;
