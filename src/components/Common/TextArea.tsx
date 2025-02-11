import styled from 'styled-components';

type Size = 'small' | 'medium' | 'large';

interface TextAreaProps
    extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    size: Size;
    backgroundColor?: string;
}

const sizeMap = {
    small: {
        width: 230,
        height: 120,
        padding: '10px',
        borderRadius: 5,
    },
    medium: {
        width: 320,
        height: 100,
        padding: '14px 17px',
        borderRadius: 10,
    },
    large: {
        width: 280,
        height: 170,
        padding: '15px',
        borderRadius: 10,
    },
};

/**
 * TextArea 컴포넌트는 사용자 정의 가능한 크기와 배경색을 가진 스타일된 텍스트 영역을 렌더링합니다.
 *
 * @param {Size} [size = 'large'] - 텍스트 영역의 크기. 'small', 'medium', 'large' 중 하나 입력 가능
 * @param {string} [backgroundColor='white'] - 텍스트 영역의 배경색. 기본값은 'white'
 * @param {React.TextareaHTMLAttributes<HTMLTextAreaElement>} props - 텍스트 영역 요소에 전달할 추가 속성
 *
 * @returns {JSX.Element} 스타일된 텍스트 영역 컴포넌트
 */
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
    ${({ $size }) => `
        width: ${sizeMap[$size].width}px;
        height: ${sizeMap[$size].height}px;
        padding: ${sizeMap[$size].padding};
        border-radius: ${sizeMap[$size].borderRadius}px;
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
