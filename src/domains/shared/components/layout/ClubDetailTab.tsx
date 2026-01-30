import Tab from '@/components/Tabs/Tab';
import { useClubDetail } from '@/domains/club/profile/model/useClubDetail';

interface TabProps {
    setActiveTab: (activeTab: string) => void;
    activeTab: string;
}

export default function ClubDetailTab({ setActiveTab, activeTab }: TabProps) {
    const { isPreview } = useClubDetail();
    return (
        <Tab
            count={3}
            backgroundColor="white"
            value={activeTab}
            onChange={setActiveTab}
        >
            <Tab.Item tabKey="intro">동아리 소개</Tab.Item>
            <Tab.Item tabKey="recruit">모집안내</Tab.Item>
            <Tab.Item tabKey="log" disabled={isPreview}>
                활동로그
            </Tab.Item>
        </Tab>
    );
}
