import styled from 'styled-components';

export default function Intro() {
    return (
        <div>
            <ScheduleContainer>
                <ScheduleTitle>🎯 주요 연간일정</ScheduleTitle>
                <ScheduleContents>
                    <ContentsRow>
                        <ContentsLabel>3월</ContentsLabel>
                        <ContentsValue>3월에 할것</ContentsValue>
                    </ContentsRow>
                    <ContentsRow>
                        <ContentsLabel>4월</ContentsLabel>
                        <ContentsValue></ContentsValue>
                    </ContentsRow>
                    <ContentsRow>
                        <ContentsLabel>6월</ContentsLabel>
                        <ContentsValue></ContentsValue>
                    </ContentsRow>
                    <ContentsRow>
                        <ContentsLabel>7월</ContentsLabel>
                        <ContentsValue></ContentsValue>
                    </ContentsRow>
                    <ContentsRow>
                        <ContentsLabel>8월</ContentsLabel>
                        <ContentsValue></ContentsValue>
                    </ContentsRow>
                </ScheduleContents>
            </ScheduleContainer>
            <div>
                <h3>🔍 우리 동아리를 소개합니다!</h3>
            </div>
        </div>
    );
}

const ScheduleContainer = styled.div`
    background-color: white;
    border-radius: 10px;
    padding: 20px;
    width: 328px;
`;
const ScheduleTitle = styled.div`
    margin-top: -5px;
    margin-bottom: 15px;
    font-size: 16px;
    font-weight: 600;
`;
const ScheduleContents = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`;
const ContentsRow = styled.div`
    display: flex;
`;
const ContentsLabel = styled.span`
    display: flex;
    background-color: #eef4ff;
    border-radius: 100px;
    width: 35px;
    height: 20px;
    justify-content: center;
    align-items: center;
    color: #33639c;
    font-size: 12px;
    font-weight: 600;
`;
const ContentsValue = styled.span`
    display: flex;
    justify-content: center;
    text-align: center;
    font-size: 14px;
    font-weight: 500;
    margin-top: 1px;
    margin-left: 7px;
`;
