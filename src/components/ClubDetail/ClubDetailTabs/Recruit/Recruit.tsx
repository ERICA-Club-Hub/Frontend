import styled from 'styled-components';
import ContentBlock from '../ContentBlock';

export default function Recruit() {
    return (
        <RecruitContainer>
            <ContentBlock title="모집기간" />
            <ContentBlock title="모집대상" />
            <ContentBlock title="유의사항" />
            <ContentBlock title="💡 기타 동아리 모집 안내" />
        </RecruitContainer>
    );
}

const RecruitContainer = styled.section`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;
