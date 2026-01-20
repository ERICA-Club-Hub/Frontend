import { useSearchParams } from 'react-router-dom';
import Tab from '../Common/Tab';
import {
    getClubCategoryLabel,
    getServerTabValue,
    isValidCategory,
    TabCategory,
} from '@/utils/search/searchTabMapping';

const TAB_TYPE_PARAM = 'type';

export default function SearchTab() {
    const [searchParams, setSearchParams] = useSearchParams();

    const typeParam = searchParams.get(TAB_TYPE_PARAM);

    const activeCategory: TabCategory = typeParam
        ? getClubCategoryLabel(typeParam)
        : '중앙동아리';

    const handleTabChange = (category: string) => {
        if (isValidCategory(category)) {
            const serverValue = getServerTabValue(category);

            const newParams = new URLSearchParams();
            newParams.set(TAB_TYPE_PARAM, serverValue);

            setSearchParams(newParams);
        }
    };

    return (
        <Tab backgroundColor="white" width="360px">
            <Tab.Item
                tabKey="중앙동아리"
                activeTab={activeCategory}
                onTabChange={handleTabChange}
            >
                중앙동아리
            </Tab.Item>
            <Tab.Item
                tabKey="단과대동아리"
                activeTab={activeCategory}
                onTabChange={handleTabChange}
            >
                단과대동아리
            </Tab.Item>
            <Tab.Item
                tabKey="학과동아리"
                activeTab={activeCategory}
                onTabChange={handleTabChange}
            >
                학과동아리
            </Tab.Item>
            <Tab.Item
                tabKey="연합동아리"
                activeTab={activeCategory}
                onTabChange={handleTabChange}
            >
                연합동아리
            </Tab.Item>
        </Tab>
    );
}
