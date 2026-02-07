import { z } from 'zod';
import { FormValues } from './profile.schema';
import { CLUB_TYPE } from '@/constants/category-config.constant';

export const validateClubCategoryRequirement = (
    data: FormValues,
    ctx: z.RefinementCtx,
) => {
    if (data.clubType === CLUB_TYPE.CENTRAL && !data.category.central) {
        ctx.addIssue({
            code: 'custom',
            path: ['category', 'central'],
        });
    }

    if (data.clubType === CLUB_TYPE.UNION && !data.category.union) {
        ctx.addIssue({
            code: 'custom',
            path: ['category', 'union'],
        });
    }

    if (
        (data.clubType === CLUB_TYPE.COLLEGE ||
            data.clubType === CLUB_TYPE.DEPARTMENT) &&
        !data.category.college
    ) {
        ctx.addIssue({
            code: 'custom',
            path: ['category', 'college'],
        });
    }

    if (
        data.clubType === CLUB_TYPE.DEPARTMENT &&
        data.category.college &&
        !data.category.department
    ) {
        ctx.addIssue({
            code: 'custom',
            path: ['category', 'department'],
        });
    }
};
