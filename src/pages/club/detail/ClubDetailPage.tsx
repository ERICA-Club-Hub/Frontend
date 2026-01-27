import TabContents from './TabContents';
import ClubDetailHeader from '@/domains/club/profile/ui/ClubDetailHeader';
import { useClubDetail } from '@/domains/club/profile/model/useClubDetail';
import ClubDetailTab from '@/domains/shared/components/layout/ClubDetailTab';

export type activeTab = 'intro' | 'recruit' | 'log';

export default function ClubDetailPage() {
    const { activeTab, setActiveTab } = useClubDetail();

    return (
        <div className="flex flex-col items-center pt-5">
            <ClubDetailHeader />
            <div className="w-full bg-white flex justify-center h-[47px]">
                <ClubDetailTab
                    setActiveTab={setActiveTab}
                    activeTab={activeTab}
                />
            </div>
            <div className="mt-[15px] mb-5">
                <TabContents activeTab={activeTab} />
            </div>
        </div>
    );
}
