export const ADMIN_TYPE = {
    SERVICE: 'service',
    CLUB: 'club',
} as const;

type AdminValue = (typeof ADMIN_TYPE)[keyof typeof ADMIN_TYPE];

type AdminType = AdminValue | null;

export type { AdminType };
