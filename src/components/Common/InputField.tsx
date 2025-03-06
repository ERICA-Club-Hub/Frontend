import styled from 'styled-components';

type Size = 'small' | 'medium' | 'large';

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
    inputSize: Size;
    backgroundColor?: string;
    isError?: boolean;
}

const sizeMap = {
    small: {
        width: 225,
        height: 40,
        padding: '11.5px 15px',
    },
    medium: {
        width: 280,
        height: 40,
        padding: '11px 15px',
    },
    large: {
        width: 320,
        height: 45,
        padding: '14px 17px',
    },
};

/**
 * InputField 컴포넌트는 사용자 정의 가능한 크기와 배경색을 가진 스타일된 입력 필드를 렌더링합니다.
 *
 * @param {Size} [inputSize = 'medium'] - 입력 필드의 크기. 'small', 'medium', 'large' 중 하나 입력 가능
 * @param {string} [backgroundColor='white'] - 입력 필드의 배경색. 기본값은 'white'
 * @param {boolean} [isError=false] - 입력 필드의 배경색. 기본값은 'white'
 * @param {React.InputHTMLAttributes<HTMLInputElement>} props - 입력 요소에 전달할 추가 속성
 *
 * @returns {JSX.Element} 스타일된 입력 필드 컴포넌트
 */

const InputField = ({
    inputSize = 'medium',
    backgroundColor = 'white',
    isError = false,
    ...props
}: InputFieldProps) => {
    return (
        <StyledInput
            $size={inputSize}
            $backgroundColor={backgroundColor}
            $isError={isError}
            {...props}
        />
    );
};

interface StyledInputFieldProps {
    $size: Size;
    $backgroundColor: string;
    $isError: boolean;
}

const StyledInput = styled.input<StyledInputFieldProps>`
    ${({ $size }) => `
        width: ${sizeMap[$size].width}px;
        height: ${sizeMap[$size].height}px;
        padding: ${sizeMap[$size].padding};
    `}
    z-index: 1;

    border: ${({ $isError }) => ($isError ? '1px solid #DC5151' : 'none')};
    border-radius: 10px;
    font-size: 14px;
    font-weight: 400;
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
