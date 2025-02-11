import styled from 'styled-components';

// large : 280 x 170
// medium : 320 x 100
// small : 230 x 120

type Size = 'small' | 'medium' | 'large';

interface TextAreaProps
    extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    size: Size;
    backgroundColor?: string;
}

const TextArea = ({
    size = 'large',
    backgroundColor = 'white',
    ...props
}: TextAreaProps) => {
    return (
        <StyledTextArea
            $size={size}
            $backgroundColor={backgroundColor}
            {...props}
        />
    );
};

interface StyledTextAreaProps {
    $size: Size;
    $backgroundColor: string;
}

const StyledTextArea = styled.textarea<StyledTextAreaProps>`
    ${({ $size }) =>
        $size === 'large'
            ? `                
                width: 280px;
                height: 170px;
                padding: 15px;
                border-radius: 10px;
`
            : $size === 'medium'
            ? `                
            width: 320px;
            height: 100px;
            padding: 14px 17px;
            border-radius: 10px;
            `
            : `                
            width: 230px;
            height: 120px;
            padding: 10px;
            border-radius: 5px;
    `}

    font-size: 12px;
    font-weight: 500;
    line-height: 18px;
    background-color: ${({ $backgroundColor, theme }) =>
        $backgroundColor === 'white' ? '#fff' : theme.colors.lightGray};
    color: ${({ theme }) => theme.colors.mainBlack};
    resize: none;

    &::placeholder {
        font-size: 14px;
        font-weight: 400;
        color: ${({ theme }) => theme.colors.subGray};
    }
`;

export { TextArea };
