import {
    CLUB_DETAIL,
    CLUB_DETAIL_PARAM,
} from '@/constants/club-detail.constant';
import ClubIntroductionForm from '@/domains/club/introduction/ui/admin/ClubIntroductionForm';
import RecruitmentForm from '@/domains/club/recruitment/ui/admin/RecruitmentForm';
import ClubAdminDetailTab from '@/domains/shared/components/tab/ClubAdminDetailTab';
import { useSearchParams } from 'react-router-dom';

export default function ClubAdminDetailPage() {
    const [searchParams] = useSearchParams();
    const currTypeParam = searchParams.get(CLUB_DETAIL_PARAM);

    const renderContent = () => {
        switch (currTypeParam) {
            case CLUB_DETAIL.INTRODUCTION:
                return <ClubIntroductionForm />;
            case CLUB_DETAIL.SCHEDULE:
                return;
            case CLUB_DETAIL.RECRUITMENT:
                return <RecruitmentForm />;
        }
    };

    return (
        <div className="relative w-full">
            <div className="sticky top-[56px] z-10">
                <ClubAdminDetailTab />
            </div>

            <main className="pt-[20px]">{renderContent()}</main>
        </div>
    );
}
