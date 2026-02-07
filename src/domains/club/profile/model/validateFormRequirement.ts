import z from 'zod';
import { FormValues } from './profile.schema';

export const validateClubCategoryRequirement = (
    data: FormValues,
    ctx: z.RefinementCtx,
) => {
    if (data.clubType === 'CENTRAL' && !data.category.central) {
        ctx.addIssue({
            code: 'custom',
            message: '중앙동아리 분과를 선택해주세요.',
            path: ['category', 'central'],
        });
    }

    if (data.clubType === 'UNION' && !data.category.union) {
        ctx.addIssue({
            code: 'custom',
            message: '연합동아리 분과를 선택해주세요.',
            path: ['category', 'union'],
        });
    }

    if (
        (data.clubType === 'COLLEGE' || data.clubType === 'DEPARTMENT') &&
        !data.category.college
    ) {
        ctx.addIssue({
            code: 'custom',
            message: '단과대를 선택해주세요.',
            path: ['category', 'college'],
        });
    }

    if (
        data.clubType === 'DEPARTMENT' &&
        data.category.college &&
        !data.category.department
    ) {
        ctx.addIssue({
            code: 'custom',
            message: '학과를 선택해주세요.',
            path: ['category', 'department'],
        });
    }
};
