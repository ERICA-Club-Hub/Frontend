import { z } from 'zod';

const introSchema = z.object({
    description: z.string().min(1),
    leaderName: z.string().min(1),
    contactEmail: z.email('올바른 이메일 형식이 아니에요.').min(1), // 유저명 + @ + 도메인 + . + 최상위도메인
    leaderPhone: z.string().optional(),
    membershipFee: z.string().optional(),
    snsAccount: z.string().optional(),
    applicationUrl: z.string().optional(),
});

type IntroSchema = z.infer<typeof introSchema>;

export { introSchema };
export type { IntroSchema };
