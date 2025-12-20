import sns from '../../../../assets/common/sns.svg';
import jjang from '../../../../assets/common/jjang.svg';
import card from '../../../../assets/common/card.svg';
import phone from '../../../../assets/common/phone.svg';
import label from '../../../../assets/common/label.svg';
import ContentBlock from '../ContentBlock';
import {
    useClubInfo,
    useIsPreview,
} from '@/hooks/queries/club-detail/useClubIntro';

export default function BaseInfo() {
    const { id, isPreview } = useIsPreview();
    const { data } = useClubInfo(id || '', isPreview);
    const baseInfo = [
        {
            key: 'leader',
            iconUrl: jjang,
            label: '대표',
            value: data?.leaderName || '대표자 이름이 없습니다.',
        },
        {
            key: 'contact',
            iconUrl: phone,
            label: '연락처',
            value: data?.leaderPhone || '연락처 정보가 제공되지 않았습니다.',
        },
        {
            key: 'meeting',
            iconUrl: label,
            label: '정기모임',
            value: data?.activities || '정해진 정기모임이 없습니다.',
        },
        {
            key: 'fee',
            iconUrl: card,
            label: '회비',
            value: data?.membershipFee
                ? `${data.membershipFee}원`
                : '회비 정보가 제공되지 않았습니다.',
        },
        {
            key: 'sns',
            iconUrl: sns,
            label: 'SNS',
            value: data?.snsUrl ? `@${data.snsUrl}` : 'SNS 정보가 없습니다.',
        },
    ];
    return (
        <ContentBlock title="동아리 기본 정보">
            <div className="flex flex-col gap-[11.5px]">
                {baseInfo.map((info) => (
                    <div key={info.key} className="flex items-center gap-4">
                        <img
                            src={info.iconUrl}
                            alt={info.label}
                            className="w-[15px] h-[15px]"
                        />
                        <span className="text-neutral-400 min-w-20">
                            {info.label}
                        </span>
                        <span className="text-neutral-700">{info.value}</span>
                    </div>
                ))}
            </div>
        </ContentBlock>
    );
}
