import { ERROR_MESSAGE } from '@/constants/error-message.constant';

export const getErrorMessage = (url: string, status: number) => {
    const matchingKey = Object.keys(ERROR_MESSAGE).find(
        (
            key, // ERROR_MESSAGE의 모든 키를 배열로 반환 후 다음의 조건과 일치하는지 하나씩 체크
        ) => new RegExp(`^${key.replace(':clubId', '[^/]+')}$`).test(url), // :clubId와 같이 동적으로 오는 값들을 커버할 수 있도록 한 후 url과 일치하는 것을 찾음
    );

    return matchingKey ? ERROR_MESSAGE[matchingKey][status] : null;
    // : ERROR_MESSAGE.default[status];
};
