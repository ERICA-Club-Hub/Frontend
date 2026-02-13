import { z } from 'zod';

const recruitmentSchema = z.object({
    due: z.string().optional(),
    target: z.string().optional(),
    notice: z.string().optional(),
    etc: z.string().optional(),
});

type RecruitmentSchema = z.infer<typeof recruitmentSchema>;

export { recruitmentSchema };
export type { RecruitmentSchema };
