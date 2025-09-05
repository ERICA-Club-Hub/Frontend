import styled from 'styled-components';
import CentralMark from '@/assets/common/central-mark.svg?react';
import CollegeMark from '@/assets/common/college-mark.svg?react';
import DepartmentMark from '@/assets/common/department-mark.svg?react';
import UnionMark from '@/assets/common/union-mark.svg?react';
import { useNavigate } from 'react-router-dom';
import CategoryCollect from '../Common/CategoryCollect';

export default function CategoryCollectSection() {
    const navigator = useNavigate();
    return (
        <CategoryCollectSectionContainer>
            <SectionTitle>카테고리별로 모아보기</SectionTitle>
            <CategoryCollectContainer>
                <CategoryCollect
                    img={<CentralMark />}
                    categoryLabel="중앙동아리"
                    onClick={() => navigator('/club/search?type=central')}
                ></CategoryCollect>
                <CategoryCollect
                    img={<CollegeMark />}
                    categoryLabel="단과대별"
                    onClick={() => navigator('/club/search?type=college')}
                ></CategoryCollect>
                <CategoryCollect
                    img={<DepartmentMark />}
                    categoryLabel="학과별"
                    onClick={() => navigator('/club/search?type=department')}
                ></CategoryCollect>
                <CategoryCollect
                    img={<UnionMark />}
                    categoryLabel="연합동아리"
                    onClick={() => navigator('/club/search?type=union')}
                ></CategoryCollect>
            </CategoryCollectContainer>
        </CategoryCollectSectionContainer>
    );
}

const CategoryCollectSectionContainer = styled.section`
    display: flex;
    flex-direction: column;
`;

const SectionTitle = styled.h3`
    font-weight: 500;
    font-size: 20px;
    margin-top: 30px;
    margin-bottom: 20px;
`;

const CategoryCollectContainer = styled.div`
    display: flex;
    gap: 17px;
`;
