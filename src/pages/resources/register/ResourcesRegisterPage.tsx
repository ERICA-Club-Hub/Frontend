import Button from '@/components/Common/Button';
import styled from 'styled-components';

export default function ResourcesRegisterPage() {
    return (
        <Container>
            <CardContainer>
                <CardContent>
                    <CardTitle>자료 제목을 입력해 주세요.</CardTitle>
                    <CardInput placeholder="자료 제목을 정확히 입력해 주세요." />
                </CardContent>
                <CardContent>
                    <CardTitle>자료를 업로드 해주세요.</CardTitle>
                    <CardUpload placeholder="📂 버튼을 클릭해 업로드 해주세요." />
                </CardContent>
            </CardContainer>
            <Button size="small" variant="filled">
                저장하기
            </Button>
        </Container>
    );
}

const Container = styled.div`
    padding-top: 15px;
    padding-left: 20px;
    padding-right: 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const CardContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const CardContent = styled.div`
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    background-color: #ffffff;
    border-radius: 10px;
`;

const CardTitle = styled.span`
    color: black;
    font-weight: 600;
    font-size: 14px;
`;

const CardInput = styled.input`
    background-color: #f7f7f7;
    height: 40px;
    border-radius: 10px;
    text-align: left;
    padding-left: 15px;
    font-size: 14px;
    font-weight: 400;
    color: black;
    &::placeholder {
        color: #989898;
    }
`;

const CardUpload = styled.input`
    background-color: #f7f7f7;
    height: 40px;
    border-radius: 10px;
    text-align: center;
    font-size: 14px;
    font-weight: 400;
    color: black;
    &::placeholder {
        color: #989898;
    }
`;
