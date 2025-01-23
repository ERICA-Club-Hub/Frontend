import Intro from './tab/Intro';
import Log from './tab/Log';
import Recruit from './tab/Recruit';

interface TabContentsProps {
    activeTab: string;
    clubId: string;
}

export default function TabContents({ activeTab, clubId }: TabContentsProps) {
    console.log(activeTab);
    if (activeTab === 'intro') {
        return <Intro clubId={clubId}></Intro>;
    } else if (activeTab === 'recruit') {
        return <Recruit clubId={clubId}></Recruit>;
    } else {
        return <Log clubId={clubId}></Log>;
    }
}
