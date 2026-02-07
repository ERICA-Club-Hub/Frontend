import { Link } from 'react-router-dom';
import Button from '@/components/Button/Button';
import CompletedIcon from '@/assets/common/completed.svg?react';
import { PATHS } from '@/routes/paths';

export default function RegistrationCompletionPage() {
    return (
        <>
            <div className="flex flex-col justify-center items-center h-[calc(100vh-56px)] pb-[56px]">
                <div className="mb-[12px]">
                    <CompletedIcon />
                </div>

                <div className="flex flex-col items-center gap-[4px] mb-[16px]">
                    <strong className="text-b2 text-brand">
                        동아리 등록 신청 완료
                    </strong>
                    <p className="text-b4 text-neutral-600">
                        승인 여부는 대표자 이메일로 알려드릴게요.
                    </p>
                </div>

                <Link to={PATHS.HOME}>
                    <Button size="md" className="text-b3 text-neutral-50">
                        홈으로 돌아가기
                    </Button>
                </Link>
            </div>
        </>
    );
}
