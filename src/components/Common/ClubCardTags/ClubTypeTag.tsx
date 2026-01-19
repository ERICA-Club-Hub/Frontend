import ClubTag from '../ClubTag';
import { CentralCategoryCode } from '@/types/domain-category.types';
import { getCategoryConfig } from '@/utils/displayHelper';

interface ClubTypeTagProps {
    clubCategory?: CentralCategoryCode | 'UNION';
}

export default function ClubTypeTag({ clubCategory }: ClubTypeTagProps) {
    const config = getCategoryConfig(clubCategory);

    return (
        <ClubTag
            text={config.label}
            emoji={config.emoji}
            backgroundColor="bg-badge-blue-bg"
            textColor="text-badge-blue-text"
        />
    );
}
