import Central from '@/assets/common/central.svg?react';
import College from '@/assets/common/college.svg?react';
import Department from '@/assets/common/department.svg?react';
import Union from '@/assets/common/union.svg?react';
import { useNavigate } from 'react-router-dom';
import CategoryCollect from './CategoryCollect';

export default function CategoryCollectSection() {
    const navigator = useNavigate();
    return (
        <section className="flex gap-[21.33px] px-[20px] py-[12px] mt-[8px]">
            <CategoryCollect
                img={<Central />}
                categoryLabel="중앙동아리"
                onClick={() => navigator('/club/search?type=central')}
            ></CategoryCollect>
            <CategoryCollect
                img={<College />}
                categoryLabel="단과대동아리"
                onClick={() => navigator('/club/search?type=college')}
            ></CategoryCollect>
            <CategoryCollect
                img={<Department />}
                categoryLabel="학과동아리"
                onClick={() => navigator('/club/search?type=department')}
            ></CategoryCollect>
            <CategoryCollect
                img={<Union />}
                categoryLabel="연합동아리"
                onClick={() => navigator('/club/search?type=union')}
            ></CategoryCollect>
        </section>
    );
}
