import styled from 'styled-components';

interface ClubTagProps {
    emoji?: string;
    text?: string;
    backgroundColor: string;
    textColor: string;
}

export default function ClubTag({
    emoji,
    text,
    backgroundColor,
    textColor,
}: ClubTagProps) {
    return (
        <ClubTagContainer
            backgroundColor={backgroundColor}
            textColor={textColor}
        >
            {emoji && <EmojiText>{emoji}</EmojiText>}
            <TagText>{text}</TagText>
        </ClubTagContainer>
    );
}

const ClubTagContainer = styled.div<{
    backgroundColor: string;
    textColor: string;
}>`
    padding: 2px 5px 2px 5px;
    display: flex;
    gap: 3px;
    background-color: ${({ backgroundColor }) => backgroundColor};
    color: ${({ textColor }) => textColor};
    font-weight: 500;
    font-size: 12px;
    line-height: 100%;
    border-radius: 5px;
    height: 18px;
    align-items: center;
`;

const EmojiText = styled.span`
    margin: 0;
    flex-shrink: 0;
`;

const TagText = styled.span`
    margin: 0;
`;
