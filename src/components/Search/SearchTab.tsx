import { useSearchParams } from 'react-router-dom';
import Tab from '../Common/Tab';

export type TabCategory = '중앙동아리' | '단과대' | '학과' | '연합동아리';

const TAB_TYPE_PARAM = 'type';

const mapping = [
    { label: '중앙동아리', value: 'central' },
    { label: '단과대', value: 'college' },
    { label: '학과', value: 'department' },
    { label: '연합동아리', value: 'union' },
];

function isValidCategory(value: string | null): value is TabCategory {
    return (
        value === '중앙동아리' ||
        value === '단과대' ||
        value === '학과' ||
        value === '연합동아리'
    );
}

const getServerValue = (label: TabCategory): string => {
    return mapping.find((item) => item.label === label)?.value || 'central';
};

const getDisplayLabel = (serverValue: string): TabCategory => {
    return (
        (mapping.find((item) => item.value === serverValue)
            ?.label as TabCategory) || '중앙동아리'
    );
};

export default function SearchTab() {
    const [searchParams, setSearchParams] = useSearchParams();

    const typeParam = searchParams.get(TAB_TYPE_PARAM);

    const activeCategory: TabCategory = typeParam
        ? getDisplayLabel(typeParam)
        : '중앙동아리';

    const handleTabChange = (category: string) => {
        if (isValidCategory(category)) {
            const newParams = new URLSearchParams(searchParams);
            const serverValue = getServerValue(category);
            newParams.set(TAB_TYPE_PARAM, serverValue);
            setSearchParams(newParams);
        }
    };

    console.log(activeCategory);
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
