import styled from 'styled-components';
import { DEFAULT_IMG } from '@/constants/DEFAULT_IMG';
import Button from '../Common/Button';

import {
    getCategoryEmoji,
    getCategoryMapping,
} from '@/utils/clubDetail/getCategoryEmoji';
import { useClubDetail } from '@/hooks/club-detail/useClubDetail';
import { useClubDetailHeader } from '@/hooks/queries/club-detail/useClubDetailHeader';
import { getRecruitmentStatusLabel } from '@/utils/clubDetail/getRecruitmentStatus';

interface RecruitStateProps {
    $state?: '모집 중' | '모집 예정' | '모집 마감';
}

export default function ClubDetailHeader() {
    const { isPreview, clubId } = useClubDetail();
    const { data } = useClubDetailHeader(clubId || '', isPreview);
    return (
        <ClubHeader>
            <ClubImage
                src={data?.profileImageUrl || DEFAULT_IMG}
                alt="Club Logo"
            />
            <PreviewWrapper>
                <PreviewContainer>
                    <ClubTitle>{data?.name}</ClubTitle>
                    <Preview>{data?.description}</Preview>
                </PreviewContainer>

                <ClubTags>
                    {/* TODO 추후에 data 여부에 따라 loading 적용 */}
                    <Tag>
                        {data?.category && getCategoryEmoji(data?.category)}{' '}
                        {data?.category && getCategoryMapping(data?.category)}
                    </Tag>
                    <RecruitState>
                        {data?.recruitmentStatus &&
                            getRecruitmentStatusLabel(data.recruitmentStatus)}
                    </RecruitState>
                </ClubTags>
            </PreviewWrapper>
            <Button
                onClick={() => {
                    if (data?.applicationUrl) {
                        window.open(data.applicationUrl, '_blank');
                    }
                }}
                size="large"
            >
                {data?.recruitmentStatus !== 'OPEN'
                    ? '모집이 마감되었어요.'
                    : '가입 신청하기'}
            </Button>
        </ClubHeader>
    );
}

const ClubHeader = styled.div`
    margin-top: 110px;
    height: 200px;
    width: 100%;
    min-height: 104px;
    background: white;
    display: flex;
    padding: 17px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
`;

const ClubImage = styled.img`
    width: 75px;
    height: 75px;
    border-radius: 10px;
    margin-right: 21px;
    object-fit: cover;
    position: absolute;
    background-color: black;
    top: -35px;
    left: 50%;
    transform: translateX(-50%);
`;

const PreviewWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const Preview = styled.div`
    color: #aeaeae;
    font-weight: 700;
    font-size: 13px;
`;

const PreviewContainer = styled.div`
    margin-top: 47px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 5px;
    margin-bottom: 10px;
`;

const ClubTitle = styled.h1`
    font-size: 18px;
    font-weight: 600;
`;

const ClubTags = styled.div`
    display: flex;
    gap: 8px;
    margin-bottom: 20px;
`;

const Tag = styled.span`
    border-radius: 4px;
    padding: 2px 5px 2px 5px;
    padding: 2p;
    font-size: 12px;
    background-color: #eef4ff;
    color: #33639c;
`;

const RecruitState = styled.span<RecruitStateProps>`
    display: flex;
    min-width: 42px;
    padding: 2px 5px 2px 5px;
    border-radius: 5px;
    font-size: 12px;
    align-items: center;
    background-color: ${(props) => {
        if (props.$state === '모집 중') {
            return '#fff4e4';
        } else if (props.$state === '모집 예정') {
            return '#F1F9DC';
        } else {
            return '#F7F7F7';
        }
    }};
    color: ${(props) => {
        if (props.$state === '모집 중') {
            return '#F08A00';
        } else if (props.$state === '모집 예정') {
            return '#8BB421';
        } else {
            return '#606060';
        }
    }};
`;
