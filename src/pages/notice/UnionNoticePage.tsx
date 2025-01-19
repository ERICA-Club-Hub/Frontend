import Card from "../../components/Common/Card"
import dummyImage from "../../assets/common/dummy-image.png"
import styled from 'styled-components';

const Title = styled.div`
    color: #232323;
    font-family: Pretendard;
    font-size: 16px;
    font-weight: 600;
    line-height: normal;
    margin: 20px;
`;

const Body = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin: 20px;
`;

const UnionNoticePage = () => {
=======
import Card from "../../components/Common/Card"
import dummyImage from "../../assets/common/dummy-image.png"
import styled from 'styled-components';
import { useState } from 'react';

const Title = styled.div`
    color: #232323;
    font-family: Pretendard;
    font-size: 16px;
    font-weight: 600;
    line-height: normal;
    margin: 20px;
`;

const Body = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin: 20px;
`;

const UnionNoticePage = () => {
    const [isRotated, setIsRotated] = useState(false);

    return <div>
        <Title>총동연 공지사항</Title>
        <Body>
            <Card 
                variant="type1" 
                imagePath={dummyImage}
                title="2024-2학기 동아리방 정기점검 안내"
                date="2024.03.21"
            />
            <Card 
                variant="type1" 
                imagePath={dummyImage}
                title="2024-2학기 동아리방 정기점검 안내"
                date="2024.03.21"
            />
            <Card 
                variant="type1" 
                imagePath={dummyImage}
                title="2024-2학기 동아리방 정기점검 안내"
                date="2024.03.21"
            />
            <Card 
                variant="type2" 
                title="제목2"
                date="2024.03.22"
                isRotated={isRotated}
                onClick={() => setIsRotated(!isRotated)}
            />
            <Card 
                variant="type3" 
                title="제목3"
                date="2024.03.23"
            />
        </Body>
    </div>;
};

export { UnionNoticePage };
