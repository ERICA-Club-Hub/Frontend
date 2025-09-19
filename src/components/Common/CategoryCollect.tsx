import { ReactNode } from 'react';
import styled from 'styled-components';

interface CategoryCollectProps {
    img: ReactNode;
    categoryLabel: string;
    onClick?: () => void;
}

export default function CategoryCollect({
    img,
    categoryLabel,
    onClick,
}: CategoryCollectProps) {
    return (
        <CategoryCollectWrapper>
            <CategoryCollectBlock onClick={onClick}>{img}</CategoryCollectBlock>
            <CategoryLabel>{categoryLabel}</CategoryLabel>
        </CategoryCollectWrapper>
    );
}

const CategoryCollectWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
`;

const CategoryCollectBlock = styled.button`
    width: 66px;
    height: 66px;
    border-radius: 10px;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const CategoryLabel = styled.span`
    font-weight: 500;
    font-size: 12px;
    color: #606060;
`;
