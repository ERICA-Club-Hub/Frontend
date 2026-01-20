import ClubTag from '../ClubTag';
import type {
    CentralCategoryCode,
    UnionCategoryCode,
    CollegeCode,
    DepartmentCode,
} from '@/types/category.types';
import { getCategoryConfig } from '@/utils/getCategoryConfig';

export type ClubCategoryCode =
    | CentralCategoryCode
    | UnionCategoryCode
    | CollegeCode
    | DepartmentCode;

interface ClubTypeTagProps {
    clubCategory?: ClubCategoryCode;
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
