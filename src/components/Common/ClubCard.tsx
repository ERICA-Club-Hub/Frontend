import styled from 'styled-components';
import { Tag } from './Tag';

interface ClubCardProps {
    title: string;
    subTitle: string;
    tags?: Array<{
        type: '동아리 및 질문' | '모집중' | '모집마감' | '모집예정';
        text: string;
    }>;
    onClick?: () => void;
}

export default function ClubCard({
    title,
    subTitle,
    tags,
    onClick,
}: ClubCardProps) {
    return (
        <CardContainer onClick={onClick} type="button">
            <ProfileImage />
            <ClubInfo>
                <TitleWrapper>
                    {tags && (
                        <TagContainer>
                            {tags.map((tag, index) => (
                                <Tag key={index} type={tag.type}>
                                    {tag.text}
                                </Tag>
                            ))}
                        </TagContainer>
                    )}
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
    justify-content: center;
    align-items: center;
    gap: 15px;
    border-radius: 10px;
    border: 1px solid #eaeaea;
    background: #fff;
    cursor: pointer;
`;

const ProfileImage = styled.img`
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
    margin-bottom: 5px;
`;

const TagContainer = styled.div`
    display: flex;
    gap: 6px;
`;

const SubTitle = styled.div`
    color: #aeaeae;
    font-size: 13px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
`;
