import styled from 'styled-components';

export default function Log() {
    return <LogGrid>활동 로그 이미지들</LogGrid>;
}
const LogGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
`;
