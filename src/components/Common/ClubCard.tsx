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
            <TitleWrapper>
                <Title>{title}</Title>
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
            <SubTitle>{subTitle}</SubTitle>
        </CardContainer>
    );
}

const CardContainer = styled.button`
    display: flex;
    width: 320px;
    height: 70px;
    padding: 15px;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    gap: 4.5px;
    flex-shrink: 0;
    border-radius: 10px;
    border: 1px solid #eaeaea;
    background: #fff;
    cursor: pointer;
    text-align: left;

    &:hover {
        background: #f7f7f7;
    }
`;

const TitleWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 6px;
    width: 100%;
    justify-content: space-between;
`;

const Title = styled.div`
    width: 160px;
    color: #232323;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
`;

const TagContainer = styled.div`
    display: flex;
    gap: 6px;
`;

const SubTitle = styled.div`
    align-self: stretch;
    color: #aeaeae;
    font-size: 13px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
`;
