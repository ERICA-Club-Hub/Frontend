import { getCategoryEmojiByLabel } from '@/utils/clubDetail/getCategoryEmoji';
import ClubTag from '../ClubTag';

interface ClubTypeTagProps {
    clubCategory?: string;
}

export default function ClubTypeTag({ clubCategory }: ClubTypeTagProps) {
    return (
        <ClubTag
            text={clubCategory}
            emoji={getCategoryEmojiByLabel(clubCategory)}
            backgroundColor="rgba(238, 244, 255, 1)"
            textColor="rgba(51, 99, 156, 1)"
        />
    );
}
