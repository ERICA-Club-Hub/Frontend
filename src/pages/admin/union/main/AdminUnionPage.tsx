import { NavigationLink } from '@/components/Common';

const AdminUnionPage = () => {
    return (
        <div className="w-full h-full flex flex-col items-center">
            <div className="w-[320px] flex flex-col items-center justify-center gap-5 mt-[50px]">
                <h1 className="w-full text-body-01 font-semibold text-black">
                    총동아리연합회님, 환영해요.
                </h1>

                <div className="flex flex-col items-center gap-[10px]">
                    <NavigationLink size="large" url="/admin/union/notice">
                        총동연 공지사항 등록하기
                    </NavigationLink>
                    <NavigationLink size="large" url="/admin/union/resources">
                        자료 등록하기
                    </NavigationLink>
                </div>
            </div>
        </div>
    );
};

export { AdminUnionPage };
