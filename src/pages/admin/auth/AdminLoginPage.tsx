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
        setCode('');
        handleLogin(code);
    };

    return (
        <div className="relative w-full h-full flex flex-col items-center justify-center gap-[50px] pt-[35%]">
            <div className="flex flex-col items-center w-[320px] h-[135px]">
                <h2 className="w-full text-body-01 font-semibold text-black mb-[15px]">
                    동아리 대표이신가요?
                </h2>
                <form
                    onSubmit={handleSubmit}
                    className="relative flex flex-col gap-[11px] mb-[78px]"
                >
                    <InputField
                        size="lg"
                        value={code}
                        onChange={handleChange}
                        placeholder="부여받은 동아리 코드를 입력해 주세요."
                        isError={!isValidate}
                    />
                    <Button type="submit" size="lg">
                        어드민 로그인하기
                    </Button>
                    {!isValidate && (
                        <p
                            className={cn(
                                'absolute top-[112px] left-[15px] text-body-03 font-medium text-sub-warning transition-opacity duration-500 ease-in-out',
                                isValidate ? 'opacity-0' : 'opacity-100',
                            )}
                        >
                            코드가 일치하지 않아요
                        </p>
                    )}
                </form>

                <Link to={PATHS.CLUB_REGISTRATION}>
                    <button className="text-body-03 font-normal text-neutral-400 underline cursor-pointer">
                        동아리 등록하기
                    </button>
                </Link>
            </div>
        </div>
    );
};

export { AdminLoginPage };
