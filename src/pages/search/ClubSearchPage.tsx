import { PATHS } from '@/routes/paths';
import ClubSearchWidget from '@/domains/shared/components/search/ClubSearchWidget';

export default function ClubSearchPage() {
    return (
        <ClubSearchWidget
            getClubDetailPath={(clubId) => PATHS.CLUB_DETAIL(clubId)}
        />
    );
}
