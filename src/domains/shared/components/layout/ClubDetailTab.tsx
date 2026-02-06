import Tab from '@/components/Tabs/Tab';

interface TabProps {
    setActiveTab: (activeTab: string) => void;
    activeTab: string;
}

export default function ClubDetailTab({ setActiveTab, activeTab }: TabProps) {
    return (
        <Tab
            count={3}
            backgroundColor="white"
            value={activeTab}
            onChange={setActiveTab}
        >
            <Tab.Item tabKey="intro">동아리 소개</Tab.Item>
            <Tab.Item tabKey="schedule">연간일정</Tab.Item>
            <Tab.Item tabKey="recruit-info">모집정보</Tab.Item>
        </Tab>
    );
}
