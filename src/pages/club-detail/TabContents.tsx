import Intro from '@/components/ClubDetail/ClubDetailTabs/Intro/Intro';
import Log from './tab/Log';
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
            return <Log />;
        default:
            return null;
    }
}
