import ClubSearchWidget from '@/domains/shared/components/search/ClubSearchWidget';
import { PATHS } from '@/routes/paths';

export default function ClubManagementPage() {
    return (
        <ClubSearchWidget
            getClubDetailPath={(clubId) =>
                PATHS.SERVICE_ADMIN_CLUBS_DETAIL(clubId)
            }
        />
    );
}
