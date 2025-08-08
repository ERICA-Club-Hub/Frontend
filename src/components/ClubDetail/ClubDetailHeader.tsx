import styled from 'styled-components';
import { DEFAULT_IMG } from '@/constants/DEFAULT_IMG';
import Button from '../Common/Button';
import { useClubDetail } from '@/hooks/club-detail/useClubDetail';

interface RecruitStateProps {
    $state?: '모집 중' | '모집 예정' | '모집 마감';
}

interface ClubDetailHeaderProps {
    clubImgUrl?: string;
    clubDescription: string;
    clubName: string;
    clubTag: string;
    recruitState: string;
    applicationUrl: string;
}

export default function ClubDetailHeader({
    recruitState,
    applicationUrl,
}: ClubDetailHeaderProps) {
    const { clubDetail } = useClubDetail();
    return (
        <>
            <ClubHeader>
                <ClubImage
                    src={clubDetail?.profileImageUrl || DEFAULT_IMG}
                    alt="Club Logo"
                />
                <PreviewWrapper>
                    <Preview>{clubDetail?.description}</Preview>
                    <ClubTitle>{clubDetail?.name}</ClubTitle>
                    <ClubTags>
                        <Tag>{clubDetail?.category}</Tag>
                        <RecruitState>
                            {clubDetail?.recruitmentStatus}
                        </RecruitState>
                    </ClubTags>
                </PreviewWrapper>
            </ClubHeader>
            <Button
                onClick={() => {
                    if (applicationUrl) {
                        window.open(applicationUrl, '_blank');
                    }
                }}
                size="large"
            >
                {recruitState !== 'OPEN'
                    ? '모집이 마감되었어요.'
                    : '가입 신청하기'}
            </Button>
        </>
    );
}

{
    /* 유틸함수 포함한 원본
     <ClubHeader>
                        <ClubImage
                            src={clubDetail?.profileImageUrl || DEFAULT_IMG}
                            alt="Club Logo"
                        />
                        <PreviewWrapper>
                            <Preview>{clubDetail?.description}</Preview>
                            <ClubTitle>{clubDetail?.name}</ClubTitle>
                            <ClubTags>
                                <Tag>
                                    {`${getCategoryEmoji(
                                        getCategoryMapping(
                                            clubDetail?.category,
                                        ),
                                    )}\u00A0\u00A0${getCategoryMapping(
                                        clubDetail?.category,
                                    )}`}
                                </Tag>
                                {clubDetail && (
                                    <RecruitState $state={getRecruitState()}>
                                        {getRecruitState()}
                                    </RecruitState>
                                )}
                            </ClubTags> */
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
