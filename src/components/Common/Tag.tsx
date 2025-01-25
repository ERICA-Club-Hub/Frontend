import styled from 'styled-components';

interface TagProps {
    type?: '동아리 및 질문' | '모집중' | '모집마감' | '모집예정';
}

const TagWrapper = styled.div<TagProps>`
    display: inline-flex;
    padding: 2px 5px;
    align-items: center;
    gap: 3px;
    border-radius: 5px;
    font-family: Pretendard;
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    width: fit-content;
    
    ${({ type = 'default' }) => {
        switch (type) {
            case '동아리 및 질문':
                return `
                    background-color: #EEF4FF;
                    color: #33639C;
                `;
            case '모집중':
                return `
                    background-color: #FFF4E4;
                    color: #F08A00;
                `;
            case '모집마감':
                return `
                    background-color: var(--Gray-4, #F7F7F7);
                    color: var(--Gray-1, #606060);
                `;
            case '모집예정':
                return `
                    background-color: var(--Background-4, #F1F9DC);
                    color: var(--Sub-Color-1, #8BB421);
                `;
        }
    }}
`;

const Tag = ({ type, children }: React.PropsWithChildren<TagProps>) => {
    return (
        <TagWrapper type={type}>
            {children}
        </TagWrapper>
    );
};

export { Tag };