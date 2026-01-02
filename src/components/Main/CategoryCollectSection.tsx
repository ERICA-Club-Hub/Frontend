import CentralMark from '@/assets/common/central-mark.svg?react';
import CollegeMark from '@/assets/common/college-mark.svg?react';
import DepartmentMark from '@/assets/common/department-mark.svg?react';
import UnionMark from '@/assets/common/union-mark.svg?react';
import { useNavigate } from 'react-router-dom';
import CategoryCollect from '../Common/CategoryCollect';

export default function CategoryCollectSection() {
    const navigator = useNavigate();
    return (
        <section className="flex flex-col">
            <h3 className="font-medium text-subtitle-01 mt-[30px] mb-5">
                카테고리별로 모아보기
            </h3>
            <div className="flex gap-[17px]">
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
            </div>
        </section>
    );
}
