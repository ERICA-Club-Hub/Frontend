import { ReactNode } from 'react';
import { ClubInfoKey } from '../../club/introduction/types/club-info.types';

export const formatClubInfo = (key: ClubInfoKey, value?: string): ReactNode => {
    if (!value) return '-';

    switch (key) {
        case 'membershipFee':
            return `${Number(value).toLocaleString()}원`;

        case 'leaderPhone':
            return value
                .replace(/[^0-9]/g, '')
                .replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`);

        case 'snsAccount': {
            const username = value.trim().startsWith('@')
                ? value.trim().substring(1)
                : value.trim();

            if (!username) return '-';
            return (
                <a
                    href={`https://www.instagram.com/${username}/`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-neutral-600"
                >
                    @{username}{' '}
                </a>
            );
        }

        default:
            return value;
    }
};
