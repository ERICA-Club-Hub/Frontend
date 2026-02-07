import { CLUB_TYPE } from '@/constants/category-config.constant';
import { FormValues } from '../model/profile.schema';

/**
 * 폼 데이터 생성 함수
 * @param data - 폼 데이터 객체
 * @param postImg - 첨부된 이미지 파일 또는 파일 배열
 * @returns FormData 객체
 */
export const createFormData = (
    data: FormValues,
    postImg: File | File[] | null,
): FormData => {
    const formData = new FormData();

    const requestBody = {
        ...data,
        category: {
            central:
                data.clubType === CLUB_TYPE.CENTRAL
                    ? data.category.central
                    : null,
            union:
                data.clubType === CLUB_TYPE.UNION ? data.category.union : null,
            college:
                data.clubType === CLUB_TYPE.COLLEGE ||
                data.clubType === CLUB_TYPE.DEPARTMENT
                    ? data.category.college
                    : null,
            department:
                data.clubType === CLUB_TYPE.DEPARTMENT
                    ? data.category.department
                    : null,
        },
    };

    formData.append(
        'requestBody',
        new Blob([JSON.stringify(requestBody)], {
            type: 'application/json',
        }),
    );

    if (postImg) {
        if (Array.isArray(postImg)) {
            postImg.forEach((file) => formData.append('image', file));
        } else {
            formData.append('image', postImg);
        }
    }

    return formData;
};
