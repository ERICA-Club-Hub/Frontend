import styled from 'styled-components';

const FooterWrapper = styled.div`
    color: var(--Gray-2, #989898);
    text-align: center;
    font-family: Pretendard;
    font-size: 12px;
    font-weight: 500;
    line-height: normal;
    margin: 10px 0 60px 0;
`;

export const Footer = () => {
    return (
        <FooterWrapper>
            ⓒ 2025. 한자리. All Rights Reserved.
        </FooterWrapper>
    );
};
