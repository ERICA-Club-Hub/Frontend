import { Footer } from '@/components/Common/Footer';
import Survey from '@/components/Main/Survey';
import CategoryCollectSection from '@/components/Main/CategoryCollectSection';
import RecentlyUpdatedClubs from '@/components/Main/RecentlyUpdatedClubs';
import OfficialAccounts from '@/components/Main/OfficialAccounts';

export default function MainPage() {
    return (
        <div className="min-h-screen flex flex-col">
            <div className="flex-1 flex flex-col items-center">
                <CategoryCollectSection />
                <Survey />
                <RecentlyUpdatedClubs />
                <OfficialAccounts />
            </div>
            <Footer />
        </div>
    );
}
