import Intro from '@/components/ClubDetail/ClubDetailTabs/Intro/Intro';
import Log from './tab/Log';
import Recruit from './tab/Recruit';

interface TabContentsProps {
    activeTab: string;
}

export default function TabContents({ activeTab }: TabContentsProps) {
    if (activeTab === 'intro') {
        return <Intro />;
    } else if (activeTab === 'recruit') {
        return <Recruit></Recruit>;
    } else {
        return <Log></Log>;
    }
}
