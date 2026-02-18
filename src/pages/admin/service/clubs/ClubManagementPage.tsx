import { useSearchParams } from 'react-router-dom';
import ClubSearchWidget from '@/domains/shared/components/search/ClubSearchWidget';
import { PATHS } from '@/routes/paths';
import { useEffect } from 'react';

export default function ClubManagementPage() {
    const [searchKeyword, setSearchKeyword] = useSearchParams();

    useEffect(() => {
        if (!searchKeyword.get('type')) {
            const newParams = new URLSearchParams(searchKeyword);
            newParams.set('type', 'central');

            setSearchKeyword(newParams, { replace: true });
        }
    }, [searchKeyword, setSearchKeyword]);

    return (
        <ClubSearchWidget
            getClubDetailPath={(clubId) =>
                PATHS.SERVICE_ADMIN_CLUBS_DETAIL(clubId)
            }
        />
    );
}
