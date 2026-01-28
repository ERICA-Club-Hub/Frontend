import {
    BASE_INFO_CONFIG,
    FALLBACK_MESSAGES,
    SNS_CONFIG,
} from '@/constants/base-info.constant';
import { ApiClubInfoResponse } from '@/domains/club/introduction/api/useClubIntro';

export type BaseInfoItem = {
    key: string;
    iconUrl: string;
    label: string;
    value: string;
} & ({ clickable: true; onClick: () => void } | { clickable: false });

export const formatBaseInfo = (
    data: ApiClubInfoResponse | undefined,
    onSnsClick: () => void,
): BaseInfoItem[] => {
    const mainInfo: BaseInfoItem[] = BASE_INFO_CONFIG.map((config) => {
        let value = '';
        switch (config.key) {
            case 'leader':
                value = data?.leaderName || FALLBACK_MESSAGES.leader;
                break;
            case 'contact':
                value = data?.leaderPhone || FALLBACK_MESSAGES.contact;
                break;
            case 'meeting':
                value = data?.activities || FALLBACK_MESSAGES.meeting;
                break;
            case 'fee':
                value = data?.membershipFee
                    ? `${data.membershipFee}원`
                    : FALLBACK_MESSAGES.fee;
                break;
        }

        return {
            ...config,
            value,
            clickable: false,
        };
    });

    const snsInfo: BaseInfoItem = data?.snsUrl
        ? {
              ...SNS_CONFIG,
              value: `@${data.snsUrl}`,
              clickable: true,
              onClick: onSnsClick,
          }
        : {
              ...SNS_CONFIG,
              value: FALLBACK_MESSAGES.sns,
              clickable: false,
          };

    return [...mainInfo, snsInfo];
};
