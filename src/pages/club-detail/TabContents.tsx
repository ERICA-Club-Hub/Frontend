import Intro from './tab/Intro';
import Log from './tab/Log';
import Recruit from './tab/Recruit';

interface TabContentsProps {
    activeTab: string;
}

export default function TabContents({ activeTab }: TabContentsProps) {
    console.log(activeTab);
    if (activeTab === 'intro') {
        return <Intro></Intro>;
    } else if (activeTab === 'recruit') {
        return <Recruit></Recruit>;
    } else {
        return <Log></Log>;
    }
}
