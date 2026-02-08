import { useState } from 'react';
import { Link } from 'react-router-dom';
import InputField from '@/components/InputField/InputField';
import Button from '@/components/Button/Button';
import useAdminLogin from '@/domains/auth/model/useAdminLogin';
import { cn } from '@/utils/cn';
import { PATHS } from '@/routes/paths';

const AdminLoginPage = () => {
    const [code, setCode] = useState<string>('');
    const { isValidate, setIsValidate, handleLogin } = useAdminLogin();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCode(e.target.value);
        setIsValidate(true);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const trimmedCode = code.trim();
        if (!trimmedCode) return;

        const isSuccess = await handleLogin(trimmedCode);
        if (isSuccess) setCode('');
    };

    return (
        <div className="w-full h-full flex flex-col items-center justify-center gap-[50px] pt-[35%]">
            <div className="flex flex-col items-center w-[320px]">
                <h2 className="w-full text-b2 text-neutral-900 text-center mb-[14px]">
                    동아리 대표 로그인
                </h2>

                <form
                    onSubmit={handleSubmit}
                    className="relative flex flex-col gap-[12px] mb-[58px]"
                >
                    <InputField
                        size="lg"
                        value={code}
                        onChange={handleChange}
                        placeholder="부여받은 동아리 코드 입력"
                        isError={!isValidate}
                    />
                    <Button type="submit" size="lg">
                        로그인
                    </Button>
                    {!isValidate && (
                        <p
                            className={cn(
                                'absolute top-[110px] left-0 text-b4 font-medium text-sub-warning transition-opacity duration-500 ease-in-out',
                                isValidate ? 'opacity-0' : 'opacity-100',
                            )}
                        >
                            코드가 일치하지 않아요
                        </p>
                    )}
                </form>

                <Link
                    to={PATHS.CLUB_REGISTRATION}
                    className="text-c1 text-neutral-500 underline cursor-pointer"
                >
                    동아리 신청하기
                </Link>
            </div>
        </div>
    );
};

export { AdminLoginPage };
