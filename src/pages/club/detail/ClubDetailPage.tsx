import TabContents from './TabContents';
import ClubDetailHeader from '@/domains/club/profile/ui/ClubDetailHeader';
import { useClubDetail } from '@/domains/club/profile/model/useClubDetail';
import ClubDetailTab from '@/domains/shared/components/layout/ClubDetailTab';

export type activeTab = 'intro' | 'schedule' | 'recruit-info';

export default function ClubDetailPage() {
    const { activeTab, setActiveTab } = useClubDetail();

    return (
        <div className="flex flex-col items-center">
            <div className="bg-neutral-00 w-full">
                <ClubDetailHeader />
                <div className="w-full flex justify-center h-11.75">
                    <ClubDetailTab
                        setActiveTab={setActiveTab}
                        activeTab={activeTab}
                    />
                </div>
            </div>
            <div className="mt-3.75 mb-5">
                <TabContents activeTab={activeTab} />
            </div>
        </div>
    );
}
