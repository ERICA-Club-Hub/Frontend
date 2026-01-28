import ContentBlock from '../../../../shared/components/card/ContentBlock';
import { useClubDetail } from '@/domains/club/profile/model/useClubDetail';
import { useClubRecruit } from '@/domains/club/recruitment/api/useClubRecruit';

export default function Recruit() {
    const { clubId, isPreview } = useClubDetail();
    const { data } = useClubRecruit(clubId || '', isPreview);
    return (
        <section className="flex flex-col gap-[10px]">
            <ContentBlock title="모집기간" content={data?.due} />
            <ContentBlock title="모집대상" content={data?.target} />
            <ContentBlock title="유의사항" content={data?.notice} />
            <ContentBlock
                title="💡 기타 동아리 모집 안내"
                content={data?.etc}
            />
        </section>
    );
}
