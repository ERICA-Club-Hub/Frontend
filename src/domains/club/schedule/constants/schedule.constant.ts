export const months = [
    { label: '1월', value: 1 },
    { label: '2월', value: 2 },
    { label: '3월', value: 3 },
    { label: '4월', value: 4 },
    { label: '5월', value: 5 },
    { label: '6월', value: 6 },
    { label: '7월', value: 7 },
    { label: '8월', value: 8 },
    { label: '9월', value: 9 },
    { label: '10월', value: 10 },
    { label: '11월', value: 11 },
    { label: '12월', value: 12 },
] as const;

export type MonthItem = (typeof months)[number];

export type MonthValue = MonthItem['value'];
export type MonthLabel = MonthItem['label'];

export const SCHEDULE_FIELD_CONFIG: Record<
    string,
    {
        name: string;
        label: string;
        required: boolean;
        hintText?: string;
        placeholder?: string;
    }
> = {
    scheduleSummary: {
        name: 'scheduleSummary',
        label: '주요 연간 일정 요약',
        required: true,
    },
    scheduleDescription: {
        name: 'scheduleDescription',
        label: '동아리 활동 설명',
        required: true,
        hintText:
            '동아리 활동 전반에 대한 설명을 작성해 주세요. (글자수 제한 없음)',
        placeholder: '동아리 활동 설명 작성',
    },
} as const;
