import TabContents from './TabContents';
import ClubDetailHeader from '@/domains/club/profile/ui/ClubDetailHeader';
import { useClubDetail } from '@/domains/club/profile/model/useClubDetail';
import ClubDetailTab from '@/domains/shared/components/layout/ClubDetailTab';
import useTooltip from '@/hooks/useTooltip';
import Tooltip from '@/components/Tooltip/Tooltip';
import AlarmIcon from '@/assets/common/alarmIcon.svg?react';

export type activeTab = 'intro' | 'schedule' | 'recruit-info';

export default function ClubDetailPage() {
    const { activeTab, setActiveTab } = useClubDetail();
    const { isVisible, triggerRef } = useTooltip();

    return (
        <div className="flex flex-col items-center">
            <div className="bg-neutral-00 w-full relative">
                <div
                    ref={triggerRef}
                    className="absolute top-[18px] right-[18px] z-50"
                >
                    <button type="button" aria-label="이메일 모집 알림 신청">
                        <AlarmIcon />
                    </button>
                    <Tooltip
                        isVisible={isVisible}
                        message="이메일로 모집알림을 받아보세요!"
                        arrowAlign="right"
                        className="right-0"
                    />
                </div>
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
