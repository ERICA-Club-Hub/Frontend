import ClubDetailHeader from '@/domains/club/profile/ui/ClubDetailHeader';
import { useNavigate } from 'react-router-dom';
import TabContentsSwitch from '../detail/TabContents';
import arrow from '@/assets/common/Expand_right.svg';
import ClubDetailTab from '@/domains/shared/components/layout/ClubDetailTab';
import { useClubDetail } from '@/domains/club/profile/model/useClubDetail';
import { useClubOverviewQuery } from '@/domains/club/profile/api/profile.queries';

export default function ClubDetailPreviewPage() {
    const navigate = useNavigate();
    const { clubId, isPreview, activeTab, setActiveTab } = useClubDetail();
    const { data, isLoading } = useClubOverviewQuery({ clubId, isPreview });

    return (
        <div className="flex flex-col items-center">
            <div>
                <div
                    className="flex mt-[15px] mb-[15px] self-start cursor-pointer"
                    onClick={() => {
                        navigate(`/admin/club/${clubId}/summary-info`);
                    }}
                >
                    <img src={arrow} alt="back" />
                    돌아가기
                </div>

                <ClubDetailHeader data={data} isLoading={isLoading} />
                <ClubDetailTab
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                />
                <TabContentsSwitch activeTab={activeTab} />
            </div>
        </div>
    );
}
