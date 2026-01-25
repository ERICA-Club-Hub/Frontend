import { Footer } from '@/components/Common/Footer';
import Survey from '@/components/Main/Survey';
import CategoryCollectSection from '@/components/Main/CategoryCollectSection';
import RecentlyUpdatedClubs from '@/components/Main/RecentlyUpdatedClubs';
import ClubSocialPreview from '@/domains/social/ui/ClubSocialPreview';

export default function MainPage() {
    return (
        <div className="min-h-screen flex flex-col">
            <div className="flex-1 flex flex-col items-center">
                <CategoryCollectSection />
                <Survey />
                <RecentlyUpdatedClubs />
                <ClubSocialPreview />
            </div>
            <Footer />
        </div>
    );
}
