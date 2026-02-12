import { z } from 'zod';

const introSchema = z.object({
    description: z.string().min(1),
    leaderName: z.string().min(1),
    contactEmail: z.email().min(1),
    leaderPhone: z.string().optional(),
    membershipFee: z.string().optional(),
    snsAccount: z.string().optional(),
    applicationUrl: z.string().optional(),
});

type IntroSchema = z.infer<typeof introSchema>;

export { introSchema };
export type { IntroSchema };
