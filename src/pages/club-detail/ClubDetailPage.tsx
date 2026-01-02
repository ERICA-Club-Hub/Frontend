import TabContents from './TabContents';
import ClubDetailHeader from '@/components/ClubDetail/ClubDetailHeader';

import { useClubDetail } from '@/hooks/club-detail/useClubDetail';
import ClubDetailTab from '@/components/ClubDetail/Tab/ClubDetailTab';

export type activeTab = 'intro' | 'recruit' | 'log';

const ClubDetailPage = () => {
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
};

export { ClubDetailPage };
