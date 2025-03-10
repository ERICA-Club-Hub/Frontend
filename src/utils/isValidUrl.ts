export const isValidUrl = (url: string | null | undefined) => {
    // url이 undefined, null, '없음' 또는 빈 문자열인 경우 유효하지 않음
    if (!url || url === '없음' || url === '') return false;

    try {
        // URL 객체 생성 시도 (잘못된 URL 형식이면 에러 발생)
        new URL(url);

        // 유효한 프로토콜인지 확인 (http 또는 https로 시작하는지)
        return url.startsWith('http://') || url.startsWith('https://');
    } catch (error) {
        return false;
    }
};
