import {
    MAX_FILE_SIZE,
    MAX_FILE_SIZE_ERROR_MESSAGE,
} from '@/constants/max-file-size.constant';

/**
 * 폼 데이터의 총 파일 크기 검증
 * @param formData - 검증할 FormData 객체
 */
export const validateFileSize = (formData: FormData) => {
    const totalSize = calculateFormDataSize(formData);

    if (totalSize > MAX_FILE_SIZE) throw new Error(MAX_FILE_SIZE_ERROR_MESSAGE);
};

/**
 * 폼 데이터의 총 크기 계산
 * @param formData - 계산할 FormData 객체
 * @returns 총 크기
 */
export const calculateFormDataSize = (formData: FormData): number => {
    let totalSize = 0;

    for (const pair of formData.entries()) {
        const value = pair[1];
        if (value instanceof File) {
            totalSize += value.size;
        } else if (typeof value === 'string') {
            totalSize += new Blob([value]).size;
        }
    }
    return totalSize;
};
