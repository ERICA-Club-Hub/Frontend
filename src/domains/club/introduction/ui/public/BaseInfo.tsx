import { useBaseInfo } from '@/domains/club/introduction/model/useBaseInfo';
import ContentBlock from '@/components/ClubDetail/ClubDetailTabs/ContentBlock';

export default function BaseInfo() {
    const { items, isLoading } = useBaseInfo();

    if (isLoading) return null;

    return (
        <ContentBlock title="동아리 기본 정보">
            <div className="flex flex-col gap-[11.5px]">
                {items.map((info) => (
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
