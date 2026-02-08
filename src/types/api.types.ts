interface APIResponse<T> {
    result: T; // 데이터 내용
    code: string; // 상태 코드
    isSuccess: boolean; // 성공 여부
    message: string; // 응답 메시지
}

interface RequestConfig {
    url: string;
    method?: string; // default GET으로 할거라 일단 optional
    data?: unknown;
    params?: unknown;
    headers?: Record<string, string>;
    requireToken?: boolean;
    clubName?: string | undefined;
}

interface ErrorConfig {
    [key: string]: {
        // key는 우리가 호출하는 api url
        [status: number]: {
            // status는 상태 반환 코드 ex) 400, 401, 402...
            message: string; // 상태 코드에 따라 실제 사용자에게 보여줄 메세지
            action?: () => void; // 에러 난 후에 작동시킬 함수 ex) 이전 페이지로 돌아가기
        };
    };
}

export type { APIResponse, RequestConfig, ErrorConfig };
