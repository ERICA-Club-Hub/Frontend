import Central from '@/assets/common/central.svg?react';
import College from '@/assets/common/college.svg?react';
import Department from '@/assets/common/department.svg?react';
import Union from '@/assets/common/union.svg?react';
import { useNavigate } from 'react-router-dom';
import CategoryCollect from './CategoryCollect';

export default function CategoryCollectSection() {
    const navigator = useNavigate();
    return (
        <section className="flex flex-col">
            <h3 className="font-medium text-subtitle-01 mt-[30px] mb-5">
                카테고리별로 모아보기
            </h3>
            <div className="flex gap-[17px]">
                <CategoryCollect
                    img={<Central />}
                    categoryLabel="중앙동아리"
                    onClick={() => navigator('/club/search?type=central')}
                ></CategoryCollect>
                <CategoryCollect
                    img={<College />}
                    categoryLabel="단과대별"
                    onClick={() => navigator('/club/search?type=college')}
                ></CategoryCollect>
                <CategoryCollect
                    img={<Department />}
                    categoryLabel="학과별"
                    onClick={() => navigator('/club/search?type=department')}
                ></CategoryCollect>
                <CategoryCollect
                    img={<Union />}
                    categoryLabel="연합동아리"
                    onClick={() => navigator('/club/search?type=union')}
                ></CategoryCollect>
            </div>
        </section>
    );
}
