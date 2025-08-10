import styled from 'styled-components';
import { DEFAULT_IMG } from '@/constants/DEFAULT_IMG';
import Button from '../Common/Button';
import {
    useClubDetail,
    useClubDetailHeader,
} from '@/hooks/club-detail/useClubDetail';
import {
    getCategoryEmoji,
    getCategoryMapping,
} from '@/utils/clubDetail/getCategoryEmoji';
import { getRecruitmentStatus } from '@/utils/clubDetail/getRecruitmentStatus';

interface RecruitStateProps {
    $state?: '모집 중' | '모집 예정' | '모집 마감';
}

export default function ClubDetailHeader() {
    const { isPreview, clubId } = useClubDetail();
    const { data } = useClubDetailHeader(clubId || '', isPreview);
    return (
        <>
            <ClubHeader>
                <ClubImage
                    src={data?.profileImageUrl || DEFAULT_IMG}
                    alt="Club Logo"
                />
                <PreviewWrapper>
                    <Preview>{data?.description}</Preview>
                    <ClubTitle>{data?.name}</ClubTitle>
                    <ClubTags>
                        {/* TODO 추후에 data 여부에 따라 loading 적용 */}
                        <Tag>
                            {data?.category && getCategoryEmoji(data?.category)}{' '}
                            {data?.category &&
                                getCategoryMapping(data?.category)}
                        </Tag>
                        <RecruitState>
                            {data?.recruitmentStatus &&
                                getRecruitmentStatus(data.recruitmentStatus)}
                        </RecruitState>
                    </ClubTags>
                </PreviewWrapper>
            </ClubHeader>
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
        </>
    );
}

const ClubHeader = styled.div`
    width: 320px;
    min-height: 104px;
    background: white;
    display: flex;
    padding: 17px;
    margin-bottom: 8px;
    border-radius: 10px;
`;

const ClubImage = styled.img`
    width: 70px;
    height: 70px;
    border-radius: 10px;
    margin-right: 21px;
    object-fit: cover;
`;

const PreviewWrapper = styled.div``;

const Preview = styled.div`
    color: #aeaeae;
    font-weight: 700;
    font-size: 13px;
`;

const ClubTitle = styled.h1`
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 11px;
`;

const ClubTags = styled.div`
    display: flex;
    gap: 8px;
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
