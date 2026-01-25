import Intro from '@/components/ClubDetail/ClubDetailTabs/Intro/Intro';
import ClubActivityLog from '@/domains/club/activity/ui/ClubActivityLog';
import Recruit from '@/components/ClubDetail/ClubDetailTabs/Recruit/Recruit';

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
