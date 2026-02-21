import Schedule from '@/domains/club/schedule/ui/public/Schedule';
import Recruit from '@/domains/club/recruitment/ui/public/Recruit';
import Intro from '@/domains/club/introduction/ui/public/Intro';

interface TabContentsProps {
    activeTab: string;
}

export default function TabContentsSwitch({ activeTab }: TabContentsProps) {
    switch (activeTab) {
        case 'intro':
            return <Intro />;
        case 'schedule':
            return <Schedule />;
        case 'recruit-info':
            return <Recruit />;
        default:
            return null;
    }
}
