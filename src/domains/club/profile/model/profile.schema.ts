import {
    CentralCategoryCode,
    ClubType,
    CollegeCode,
    DepartmentCode,
    UnionCategoryCode,
} from '@/types/category.types';
import { z } from 'zod';
import { validateClubCategoryRequirement } from './validateFormRequirement';

const categorySchema = z.object({
    central: z
        .string()
        .nullable()
        .optional() as z.ZodType<CentralCategoryCode | null>,
    union: z
        .string()
        .nullable()
        .optional() as z.ZodType<UnionCategoryCode | null>,
    college: z.string().nullable().optional() as z.ZodType<CollegeCode | null>,
    department: z
        .string()
        .nullable()
        .optional() as z.ZodType<DepartmentCode | null>,
});

const baseSchema = z.object({
    clubName: z.string().min(1),
    clubType: z.string().min(1) as z.ZodType<ClubType>,
    category: categorySchema,
    image: z.string().optional(),
    oneLiner: z.string().min(1).max(18),
});

const profileSchema = baseSchema.superRefine(validateClubCategoryRequirement);

const registrationSchema = baseSchema
    .extend({
        leaderEmail: z.email(), // 유저명 + @ + 도메인 + . + 최상위도메인
        briefIntroduction: z.string().min(1),
    })
    .superRefine(validateClubCategoryRequirement);

type RegistrationSchema = z.infer<typeof registrationSchema>;
type ProfileSchema = z.infer<typeof profileSchema>;
type FormValues = RegistrationSchema | ProfileSchema;

export { registrationSchema, profileSchema };
export type { FormValues };
