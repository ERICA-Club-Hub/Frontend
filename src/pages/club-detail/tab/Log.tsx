import styled from 'styled-components';

export default function Log() {
    return (
        <Container>
            <LogGrid>
                <LogImg></LogImg>
                <LogImg></LogImg>
                <LogImg></LogImg>
                <LogImg></LogImg>
                <LogImg></LogImg>
                <LogImg></LogImg>
                <LogImg></LogImg>
                <LogImg></LogImg>
                <LogImg></LogImg>
                <LogImg></LogImg>
                <LogImg></LogImg>
            </LogGrid>
        </Container>
    );
}
const LogGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 7px;
`;
const Container = styled.div`
    background-color: white;
    border-radius: 10px;
    padding: 20px;
    width: 328px;
    margin-bottom: 7px;
`;
const LogImg = styled.img`
    width: 95px;
    height: 95px;
    border-radius: 5px;
`;
