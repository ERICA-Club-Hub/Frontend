import { PropsWithChildren } from 'react';
import styled from 'styled-components';

interface ContentBlockProps extends PropsWithChildren {
    hasTitle?: boolean;
    title?: string;
    content?: string;
}

export default function ContentBlock({
    hasTitle = true,
    title,
    content,
    children,
}: ContentBlockProps) {
    return (
        <Container>
            {hasTitle && <Title>{title}</Title>}
            {children}
            {content && (
                <Content>
                    <ContentSpan>
                        {content === '' ? `${title} 내용이 비었어요.` : content}
                    </ContentSpan>
                </Content>
            )}
        </Container>
    );
}

const Container = styled.div`
    background-color: white;
    border-radius: 10px;
    padding: 20px;
    width: 328px;
    margin-bottom: 7px;
`;

const Title = styled.div`
    margin-top: -5px;
    margin-bottom: 15px;
    font-size: 16px;
    font-weight: 600;
`;

const Content = styled.div`
    width: 278px;
    margin-bottom: 25px;
`;

const ContentSpan = styled.span`
    white-space: pre-line;
    font-size: 14px;
    color: #606060;
`;
