import { z } from 'zod';

const recruitmentSchema = z.object({
    due: z.string().optional().default(''),
    target: z.string().optional().default(''),
    notice: z.string().optional().default(''),
    etc: z.string().optional().default(''),
});

type RecruitmentSchema = z.infer<typeof recruitmentSchema>;

export { recruitmentSchema };
export type { RecruitmentSchema };
