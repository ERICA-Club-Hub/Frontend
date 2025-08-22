import { useSearchParams } from 'react-router-dom';
import Tab from '../Common/Tab';

export type TabCategory = '중앙동아리' | '단과대' | '학과' | '연합동아리';

const TAB_CATEGORY_PARAM = 'category';

function isValidCategory(value: string | null): value is TabCategory {
    return (
        value === '중앙동아리' ||
        value === '단과대' ||
        value === '학과' ||
        value === '연합동아리'
    );
}

export default function SearchTab() {
    const [searchParams, setSearchParams] = useSearchParams();

    const categoryParam = searchParams.get(TAB_CATEGORY_PARAM);
    const activeCategory: TabCategory = isValidCategory(categoryParam)
        ? categoryParam
        : '중앙동아리';

    const handleTabChange = (category: string) => {
        if (isValidCategory(category)) {
            const newParams = new URLSearchParams(searchParams);
            newParams.set(TAB_CATEGORY_PARAM, category);
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
                tabKey="단과대"
                activeTab={activeCategory}
                onTabChange={handleTabChange}
            >
                단과대
            </Tab.Item>
            <Tab.Item
                tabKey="학과"
                activeTab={activeCategory}
                onTabChange={handleTabChange}
            >
                학과
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
