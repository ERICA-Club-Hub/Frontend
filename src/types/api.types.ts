interface RequestConfig {
    url: string;
    method?: string; // default GET으로 할거라 일단 optional
    data?: unknown;
    headers?: Record<string, string>;
    requireToken?: boolean;
    clubName?: string | undefined;
}

export type { RequestConfig };
