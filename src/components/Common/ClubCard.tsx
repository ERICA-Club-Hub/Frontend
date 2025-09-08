import styled from 'styled-components';
import ClubTypeTag from './ClubCardTags/ClubTypeTag';
import RecruitStatusTag from './ClubCardTags/RecruitStatusTag';
import OptimizedImage from './Image';

interface ClubCardProps {
    title: string;
    subTitle: string;
    tags?: string[];
    onClick?: () => void;
    categoryName: string;
    recruitmentStatus: string;
    clubProfileImageUrl: string;
}

export default function ClubCard({
    title,
    subTitle,
    onClick,
    categoryName,
    recruitmentStatus,
    clubProfileImageUrl,
}: ClubCardProps) {
    return (
        <CardContainer onClick={onClick} type="button">
            <ProfileImage width={75} height={75} src={clubProfileImageUrl} />
            <ClubInfo>
                <TitleWrapper>
                    <TagContainer>
                        <ClubTypeTag clubCategory={categoryName} />
                        <RecruitStatusTag
                            recruitmentStatus={recruitmentStatus}
                        />
                    </TagContainer>
                </TitleWrapper>
                <Title>{title}</Title>
                <SubTitle>{subTitle}</SubTitle>
            </ClubInfo>
        </CardContainer>
    );
}

const CardContainer = styled.button`
    display: flex;
    width: 320px;
    height: 95px;
    padding: 10px;
    justify-content: flex-start;
    align-items: center;
    gap: 15px;
    border-radius: 10px;
    border: 1px solid #eaeaea;
    background: #fff;
    cursor: pointer;
`;

const ProfileImage = styled(OptimizedImage)`
    width: 75px;
    height: 75px;
    border-radius: 5px;
`;

const ClubInfo = styled.div`
    display: flex;
    flex-direction: column;
    width: 204px;
    height: 65px;
    justify-content: flex-start;
    align-items: flex-start;
`;

const TitleWrapper = styled.div`
    display: flex;
    gap: 6px;
    margin-bottom: 7px;
`;

const Title = styled.p`
    color: #232323;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    margin: 0 0 5px 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const TagContainer = styled.div`
    display: flex;
    gap: 6px;
`;

const SubTitle = styled.p`
    color: #aeaeae;
    font-size: 13px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    width: 100%;
    margin: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: left;
`;
