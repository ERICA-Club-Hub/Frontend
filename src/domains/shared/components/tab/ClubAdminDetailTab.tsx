import Tab from '@/components/Tabs/Tab';
import {
    CLUB_DETAIL,
    CLUB_DETAIL_PARAM,
} from '@/constants/club-detail.constant';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

export default function ClubAdminDetailTab() {
    const [searchParams, setSearchParams] = useSearchParams();
    const currTypeParam = searchParams.get(CLUB_DETAIL_PARAM);

    const handleTabChange = (tabKey: string) => {
        if (currTypeParam === tabKey) return;

        setSearchParams({ [CLUB_DETAIL_PARAM]: tabKey });
    };

    useEffect(() => {
        if (!currTypeParam) {
            setSearchParams({ [CLUB_DETAIL_PARAM]: CLUB_DETAIL.INTRODUCTION });
        }
    }, []);

    return (
        <Tab
            count={3}
            backgroundColor="white"
            value={currTypeParam ? currTypeParam : ''}
            onChange={handleTabChange}
            className="w-full h-[53px]"
        >
            <Tab.Item tabKey={CLUB_DETAIL.INTRODUCTION}>동아리소개</Tab.Item>
            <Tab.Item tabKey={CLUB_DETAIL.SCHEDULE}>연간일정</Tab.Item>
            <Tab.Item tabKey={CLUB_DETAIL.RECRUITMENT}>모집정보</Tab.Item>
        </Tab>
    );
}
