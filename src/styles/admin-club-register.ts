import styled from 'styled-components';

const GuideText = styled.p`
    width: 100%;
    font-size: 12px;
    font-weight: 400;
    color: ${({ theme }) => theme.colors.subGray};
`;

const InnerWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    ${GuideText} {
        padding-left: 7px;
        margin-bottom: 10px;
    }
`;

const Label = styled.label`
    width: 100%;
    padding-left: 7px;
    margin-bottom: 10px;
    font-size: 16px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.mainBlack};
`;

export { GuideText, InnerWrapper, Label };
