import { useSearchParams } from 'react-router-dom';
import Tab from '@/components/Tabs/Tab';
import { CLUB_TYPE_DISPLAYS } from '@/constants/dropdown-option-config.constant';

const TAB_TYPE_PARAM = 'type';

export default function SearchTab() {
    const [searchParams, setSearchParams] = useSearchParams();

    const typeParam = searchParams.get(TAB_TYPE_PARAM);

    const handleTabChange = (tabKey: string) => {
        const newParams = new URLSearchParams();
        newParams.set(TAB_TYPE_PARAM, tabKey);

        setSearchParams(newParams);
    };

    return (
        <Tab
            count={4}
            backgroundColor="white"
            value={typeParam ? typeParam : ''}
            onChange={handleTabChange}
        >
            <Tab.Item tabKey={CLUB_TYPE_DISPLAYS.CENTRAL.value}>
                중앙동아리
            </Tab.Item>
            <Tab.Item tabKey={CLUB_TYPE_DISPLAYS.COLLEGE.value}>
                단과대동아리
            </Tab.Item>
            <Tab.Item tabKey={CLUB_TYPE_DISPLAYS.DEPARTMENT.value}>
                학과동아리
            </Tab.Item>
            <Tab.Item tabKey={CLUB_TYPE_DISPLAYS.UNION.value}>
                연합동아리
            </Tab.Item>
        </Tab>
    );
}
