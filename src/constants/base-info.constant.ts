import sns from '@/assets/common/sns.svg';
import jjang from '@/assets/common/jjang.svg';
import card from '@/assets/common/card.svg';
import phone from '@/assets/common/phone.svg';
import label from '@/assets/common/label.svg';

export const FALLBACK_MESSAGES = {
    leader: '대표자 이름이 없습니다.',
    contact: '연락처 정보가 제공되지 않았습니다.',
    meeting: '정해진 정기모임이 없습니다.',
    fee: '회비 정보가 제공되지 않았습니다.',
    sns: 'SNS 정보가 없습니다.',
} as const;

export const BASE_INFO_CONFIG = [
    { key: 'leader', label: '대표', iconUrl: jjang },
    { key: 'contact', label: '연락처', iconUrl: phone },
    { key: 'meeting', label: '정기모임', iconUrl: label },
    { key: 'fee', label: '회비', iconUrl: card },
] as const;

export const SNS_CONFIG = {
    key: 'sns',
    label: 'SNS',
    iconUrl: sns,
} as const;
