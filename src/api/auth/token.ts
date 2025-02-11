let accessToken: string | null = null; // 토큰은 클라이언트 메모리로 관리하기 위해서 선언

// response에 토큰이 있을 때 메모리에 저장하는 함수
export const setAccessToken = (token: string) => {
    accessToken = token;
};

// 토큰이 요구되는 API에 넣기 위해서 사용할 함수
export const getAccessToken = () => accessToken;

// 로그아웃이나 토큰 재발급 실패했을 때 토큰 삭제하기 위해 사용할 함수
export const removeAccessToken = () => {
    accessToken = null;
};
