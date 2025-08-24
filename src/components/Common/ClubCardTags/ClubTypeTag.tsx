import {
    Category,
    getCategoryEmoji,
    getCategoryMapping,
} from '@/utils/clubDetail/getCategoryEmoji';
import ClubTag from '../ClubTag';

interface ClubTypeTagProps {
    clubCategory: Category;
}

export default function ClubTypeTag({ clubCategory }: ClubTypeTagProps) {
    return (
        <ClubTag
            text={getCategoryMapping(clubCategory)}
            emoji={getCategoryEmoji(clubCategory)}
            backgroundColor="rgba(238, 244, 255, 1)"
            textColor="rgba(51, 99, 156, 1)"
        />
    );
}
