import ErrorIcon from '@/assets/common/error-icon.svg?react';
import styled from 'styled-components';

const ErrorPage = () => {
    return (
        <Container>
            <ErrorIcon />
            <h1>페이지가 비어있어요!</h1>
            <p>입력한 페이지 주소를 다시 한번 확인해 주세요.</p>
        </Container>
    );
};

export { ErrorPage };

const Container = styled.div`
    width: 100%;
    height: calc(100vh - 55px);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;

    h1 {
        font-size: 18px;
        font-weight: 500;
        color: ${(props) => props.theme.colors.mainBlack};
    }

    p {
        font-size: 14px;
        font-weight: 500;
        color: ${(props) => props.theme.colors.mainBlack};
    }
`;
