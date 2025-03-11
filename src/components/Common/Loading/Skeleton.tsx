import styled, { keyframes } from 'styled-components';

export default function Skeleton({
    width,
    height,
}: {
    width: number;
    height: number;
}) {
    return <Container $width={width} height={height} />;
}

const SkeletonLoading = keyframes`
  0% {
    background-color: #E3E7EC;;
  }
  100% {
    background-color: #F2F4F6;
  }
`;

const Container = styled.div<{ $width: number; height: number }>`
    width: ${({ $width }) => $width}px;
    height: ${({ height }) => height}px;
    border-radius: 10px;
    animation: ${SkeletonLoading} 0.8s linear infinite alternate;
`;
