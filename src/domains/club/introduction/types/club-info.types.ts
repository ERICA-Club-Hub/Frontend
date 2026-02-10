import { ReactNode } from 'react';

export type ClubInfoKey =
    | 'leaderName'
    | 'contactEmail'
    | 'leaderPhone'
    | 'membershipFee'
    | 'snsAccount';

export interface InfoMeta {
    icon: ReactNode;
    label: string;
}
