import Sns from '@/assets/common/sns.svg?react';
import Jjang from '@/assets/common/jjang.svg?react';
import Card from '@/assets/common/card.svg?react';
import Phone from '@/assets/common/phone.svg?react';
import Label from '@/assets/common/label.svg?react';
import { ClubInfoKey, InfoMeta } from '../types/club-info.types';
import { ClubDetailRequest } from '@/api/data-contracts';

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

// 동아리 소개 폼 필드 설정
export const INTRODUCTION_FIELD_CONFIG: {
    name: keyof ClubDetailRequest;
    label: string;
    required: boolean;
    hintText?: string;
    placeholder: string;
}[] = [
    {
        name: 'description',
        label: '동아리 소개글',
        required: true,
        hintText: '자유롭게 소개 ∙ 홍보글을 작성해 주세요! (글자수 제한 없음)',
        placeholder: '동아리 소개글 작성',
    },
    {
        name: 'leaderName',
        label: '대표 이름',
        required: true,
        placeholder: '동아리 대표 이름 작성',
    },
    {
        name: 'contactEmail',
        label: '문의 이메일',
        required: true,
        placeholder: '정확한 이메일 작성',
    },
    {
        name: 'leaderPhone',
        label: '연락처',
        required: false,
        placeholder: '"-" 포함 작성',
    },
    {
        name: 'membershipFee',
        label: '회비',
        required: false,
        placeholder: '숫자로 작성',
    },
    {
        name: 'snsAccount',
        label: 'SNS',
        required: false,
        hintText: '인스타그램 계정이 있다면, 입력해 주세요.',
        placeholder: '"@" 포함 작성',
    },
    {
        name: 'applicationUrl',
        label: '동아리 신청폼 링크',
        required: false,
        hintText: '신규 신청을 받을 폼 URL을 정확히 입력해 주세요.',
        placeholder: 'https://',
    },
] as const;
