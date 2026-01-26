import Tab from '@/components/Common/Tab';
import { useClubDetail } from '@/domains/club/profile/model/useClubDetail';

interface TabProps {
    setActiveTab: (activeTab: string) => void;
    activeTab: string;
}

export default function ClubDetailTab({ setActiveTab, activeTab }: TabProps) {
    const { isPreview } = useClubDetail();
    return (
        <Tab backgroundColor="white">
            <Tab.Item
                tabKey="intro"
                activeTab={activeTab}
                onTabChange={setActiveTab}
            >
                동아리 소개
            </Tab.Item>
            <Tab.Item
                tabKey="recruit"
                activeTab={activeTab}
                onTabChange={setActiveTab}
            >
                모집안내
            </Tab.Item>
            <Tab.Item
                tabKey="log"
                activeTab={activeTab}
                onTabChange={setActiveTab}
                disabled={isPreview}
            >
                활동로그
            </Tab.Item>
        </Tab>
    );
}
