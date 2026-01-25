import ErrorIcon from '@/assets/common/error-icon.svg?react';

export default function ErrorPage() {
    return (
        <div className="w-full h-[calc(100vh-55px)] flex flex-col justify-center items-center gap-[10px]">
            <ErrorIcon />
            <h1 className="text-[18px] font-medium text-black">
                페이지가 비어있어요!
            </h1>
            <p className="text-body-03 font-medium text-black">
                입력한 페이지 주소를 다시 한번 확인해 주세요.
            </p>
        </div>
    );
}
