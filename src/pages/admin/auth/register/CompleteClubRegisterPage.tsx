import { Link } from 'react-router-dom';
import Button from '@/components/Common/Button';

export default function CompleteClubRegisterPage() {
    return (
        <>
            <div className="flex flex-col items-center h-[calc(100vh-55px)] pt-[240px]">
                <div className="text-body-01 font-semibold mb-[15px] text-black text-center">
                    동아리 등록 요청이 완료되었어요.
                </div>
                <div className="text-body-03 font-medium mb-[40px] text-neutral-500 text-center">
                    동아리 등록 승인 결과는 대표자 이메일로 <br />
                    알려드릴게요.
                </div>
                <Link to="/">
                    <Button size="large">홈으로 돌아가기</Button>
                </Link>
            </div>
        </>
    );
}
