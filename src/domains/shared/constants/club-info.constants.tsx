import Sns from '@/assets/common/sns.svg?react';
import Jjang from '@/assets/common/jjang.svg?react';
import Card from '@/assets/common/card.svg?react';
import Phone from '@/assets/common/phone.svg?react';
import Label from '@/assets/common/label.svg?react';
import { ClubInfoKey, InfoMeta } from '../types/club-info.types';

export const DISPLAY_ORDER: ClubInfoKey[] = [
    'leaderName',
    'contactEmail',
    'leaderPhone',
    'membershipFee',
    'snsAccount',
] as const;

export const CLUB_INFO_META: Record<ClubInfoKey, InfoMeta> = {
    leaderName: {
        icon: <Jjang className="w-4 h-4" />,
        label: '대표',
    },
    contactEmail: {
        icon: <Label className="w-4 h-4" />,
        label: '이메일',
    },
    leaderPhone: {
        icon: <Phone className="w-4 h-4" />,
        label: '연락처',
    },
    membershipFee: {
        icon: <Card className="w-4 h-4" />,
        label: '회비',
    },
    snsAccount: {
        icon: <Sns className="w-4 h-4" />,
        label: 'SNS',
    },
} as const;
