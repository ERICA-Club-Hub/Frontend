import styled from 'styled-components';
import ActivityGuide from './ActivityGuide';
import AnnualSchedule from './AnnualSchedule';
import BaseInfo from './BaseInfo';
import ClubIntroduce from './ClubIntroduce';

export default function Intro() {
    return (
        <IntroContainer>
            <BaseInfo />
            <AnnualSchedule />
            <ClubIntroduce />
            <ActivityGuide />
        </IntroContainer>
    );
}

const IntroContainer = styled.section`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;
