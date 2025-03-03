import styled, { css } from 'styled-components';
import { Tag } from './Tag';
import downloadIcon from '../../assets/common/card_download.svg';
import rightArrowIcon from '../../assets/common/card_right_arrow.svg';

interface CardProps {
    $variant?: 'unionNotice' | 'serviceNotice' | 'resources' | 'FAQ';
    $imagePath?: string;
    title: string;
    date?: string;
    questionType?: string;
    onClick?: () => void;
    isRotated?: boolean;
}

const CardWrapper = styled.button<{ $variant?: string }>`
    width: 320px;
    height: 71px;
    position: relative;
    display: flex;
    border-radius: 10px;
    background: #FFFFFF;
    border: 1px solid var(--Gray-4, #F7F7F7);
    align-items: center;
    cursor: pointer;
    padding: 0;
    transition: background-color 0.2s ease;
    
    &:hover {
        background-color: #f5f5f5;
    }
    
    ${({ $variant }) => 
        ($variant === 'serviceNotice' || $variant === 'resources' || $variant === 'FAQ') && css`
            padding: 0 20px;
    `}
`;

const CardImage = styled.div<{ $imagePath?: string }>`
    width: 55px;
    height: 55px;
    flex-shrink: 0;
    border-radius: 5px;
    margin: 8px 15px 8px 8px;
    background: ${({ $imagePath }) => 
        $imagePath ? `url(${$imagePath}) lightgray 50% / cover no-repeat` : 'lightgray'};
`;

const TitleDateWrapper = styled.div<{ $variant?: string }>`
    display: flex;
    flex-direction: column;
    gap: 5px;
    padding: 18px 0px 17px 0px;
    width: 100%;
`;

const CardTitle = styled.div`
    color: var(--Black, #232323);
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    text-align: left;
`;

const CardDate = styled.div`
    color: #AEAEAE;
    font-family: Pretendard;
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    text-align: left;
`;

const IconBase = styled.img<{ $isRotated?: boolean }>`
    width: 24px;
    height: 24px;
    margin-left: auto;
    transition: transform 0.3s ease;
    transform: ${({ $isRotated }) => $isRotated ? 'rotate(90deg)' : 'rotate(0deg)'};
`;

const TagWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

const Card = ({ $variant = 'unionNotice', $imagePath, title, date, questionType, onClick, isRotated }: CardProps) => {
    return (
        <CardWrapper $variant={$variant} onClick={onClick} type="button">
            {$variant === 'unionNotice' && (
                <>
                    <CardImage $imagePath={$imagePath} />
                    <TitleDateWrapper $variant={$variant}>
                        <CardTitle>{title}</CardTitle>
                        <CardDate>{date}</CardDate>
                    </TitleDateWrapper>
                </>
            )}

            {$variant === 'serviceNotice' && (
                <>
                    <TitleDateWrapper $variant={$variant}>
                        <CardTitle>{title}</CardTitle>
                        <CardDate>{date}</CardDate>
                    </TitleDateWrapper>
                    <IconBase 
                        src={rightArrowIcon} 
                        alt="right arrow" 
                        $isRotated={isRotated}
                    />
                </>
            )}

            {$variant === 'resources' && (
                <>
                    <TitleDateWrapper $variant={$variant}>
                        <CardTitle>{title}</CardTitle>
                        <CardDate>{date}</CardDate>
                    </TitleDateWrapper>
                    <IconBase src={downloadIcon} alt="download icon" />
                </>
            )}

            {$variant === 'FAQ' && (
                <>
                    <TitleDateWrapper $variant={$variant}>
                        <CardTitle>{title}</CardTitle>
                        <TagWrapper>
                            <Tag type="동아리 및 질문">{questionType}</Tag>
                        </TagWrapper>
                    </TitleDateWrapper>
                    <IconBase 
                        src={rightArrowIcon} 
                        alt="right arrow" 
                        $isRotated={isRotated}
                    />
                </>
            )}
        </CardWrapper>
    );
};

export default Card;
