import Intro from '@/domains/shared/components/layout/Intro';
import ClubActivityLog from '@/domains/club/activity/ui/ClubActivityLog';
import Recruit from '@/domains/club/recruitment/ui/public/Recruit';

interface TabContentsProps {
    activeTab: string;
}

export default function TabContentsSwitch({ activeTab }: TabContentsProps) {
    switch (activeTab) {
        case 'intro':
            return <Intro />;
        case 'recruit':
            return <Recruit />;
        case 'log':
            return <ClubActivityLog />;
        default:
            return null;
    }
}
