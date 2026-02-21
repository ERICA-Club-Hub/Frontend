import z from 'zod';
import { MonthValue } from '../constants/schedule.constant';

const scheduleSchema = z.object({
    scheduleId: z.number().optional(),
    month: z
        .number()
        .min(1)
        .max(12)
        .nullable()
        .refine((value) => value !== null) as z.ZodType<MonthValue | null>,
    content: z.string().min(1).max(29),
});

export const schedulesSchema = z.object({
    schedules: z.array(scheduleSchema),
    scheduleDescription: z.string().min(1),
});

export type SchedulesSchema = z.infer<typeof schedulesSchema>;
