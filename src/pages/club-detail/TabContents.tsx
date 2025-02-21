import Intro from './tab/Intro';
import Log from './tab/Log';
import Recruit from './tab/Recruit';

interface TabContentsProps {
    clubName?: string | null;
    clubImg?: string | null;
    activeTab: string;
    clubId: string;
    nowUrl: string;
}

export default function TabContents({
    activeTab,
    clubId,
    clubName,
    clubImg,
}: TabContentsProps) {
    console.log(activeTab);
    if (activeTab === 'intro') {
        return <Intro clubId={clubId}></Intro>;
    } else if (activeTab === 'recruit') {
        return <Recruit clubId={clubId}></Recruit>;
    } else {
        return (
            <Log clubName={clubName} clubImg={clubImg} clubId={clubId}></Log>
        );
    }
}
