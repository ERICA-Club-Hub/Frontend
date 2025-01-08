import { TopNavigator } from '@/components/Common';
import { loginNavigations } from '@/constants';

const AdminLoginPage = () => {
    return (
        <div>
            <TopNavigator navList={loginNavigations} />
        </div>
    );
};

export { AdminLoginPage };
