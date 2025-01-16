import styled from 'styled-components';

// large : 320 x 45
// medium : 280 x 40
// small : 225 x 40

type Size = 'small' | 'medium' | 'large';

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
    inputSize: Size;
    backgroundColor?: string;
}

const InputField = ({
    inputSize = 'medium',
    backgroundColor = 'white',
    ...props
}: InputFieldProps) => {
    return (
        <StyledInput
            $size={inputSize}
            $backgroundColor={backgroundColor}
            {...props}
        />
    );
};

interface StyledInputFieldProps {
    $size: Size;
    $backgroundColor: string;
}

const StyledInput = styled.input<StyledInputFieldProps>`
    ${({ $size }) =>
        $size === 'large'
            ? `                
                width: 320px;
                height: 45px;
                padding: 14px 17px;
`
            : $size === 'medium'
            ? `                
                width: 280px;
                height: 40px;
                padding: 11px 15px;
    `
            : `                
                width: 225px;
                height: 40px;
                padding: 11.5px 15px;
    `}

    border-radius: 10px;
    font-size: 14px;
    font-weight: 500;
    background-color: ${({ $backgroundColor, theme }) =>
        $backgroundColor === 'white' ? '#fff' : theme.colors.lightGray};
    color: ${({ theme }) => theme.colors.mainBlack};

    &::placeholder {
        font-size: 14px;
        font-weight: 500;
        color: ${({ theme }) => theme.colors.subGray};
    }
`;

export { InputField };
