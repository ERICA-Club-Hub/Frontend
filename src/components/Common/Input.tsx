import styled, { css } from 'styled-components';

// large : 320 x 45
// medium : 280 x 40
// small : 225 x 40

type Size = 'small' | 'medium' | 'large';

interface InputProps {
    placeholder: string;
    size?: Size;
    backgroundColor?: string;
}

interface StyledInputProps {
    size: Size;
    backgroundColor: string;
}

const Input = ({
    placeholder,
    size = 'medium',
    backgroundColor = 'gray',
    ...props
}: InputProps) => {
    return (
        <StyledInput
            placeholder={placeholder}
            size={size}
            backgroundColor={backgroundColor}
            {...props}
        />
    );
};

const getButtonSize = (size: Size) => {
    switch (size) {
        case 'large':
            return css`
                width: 320px;
                height: 45px;
                padding: 14px 17px;
            `;
        case 'medium':
            return css`
                width: 280px;
                height: 40px;
                padding: 11px 15px;
            `;
        case 'small':
            return css`
                width: 225px;
                height: 40px;
                padding: 11.5px 15px;
            `;
    }
};

const StyledInput = styled.input<StyledInputProps>`
    ${({ size }) => getButtonSize(size)}
    border-radius: 10px;

    font-size: 14px;
    font-weight: 400;
    background-color: ${({ backgroundColor, theme }) =>
        backgroundColor === 'gray' ? theme.colors.lightGray : '#fff'};
    color: ${({ theme }) => theme.colors.mainBlack};

    &::placeholder {
        font-size: 14px;
        font-weight: 500;
        color: ${({ theme }) => theme.colors.subGray};
    }
`;

export { Input };
