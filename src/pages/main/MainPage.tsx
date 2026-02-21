import { Footer } from '@/components/Footer/Footer';
import FeedbackBanner from '@/domains/feedback/ui/FeedbackBanner';
import CategoryCollectSection from '@/domains/club/category/ui/CategoryCollectSection';
import RecentlyUpdatedClubs from '@/domains/club/recent/ui/RecentlyUpdatedClubs';
import ClubSocialPreview from '@/domains/social/ui/ClubSocialPreview';

export default function MainPage() {
    return (
        <div className="min-h-screen flex flex-col">
            <div className="flex-1 flex flex-col items-center">
                <CategoryCollectSection />
                <FeedbackBanner />
                <RecentlyUpdatedClubs />
                <ClubSocialPreview />
            </div>
            <Footer />
        </div>
    );
}
