import NavigationLink from '@/domains/shared/components/link/NavigationLink';
import { serviceAdminMenus } from '@/constants/navigations.constant';

export default function ServiceAdminPage() {
    return (
        <div className="flex flex-col items-center gap-[10px] w-full pt-[22px]">
            {serviceAdminMenus.map((menu) => (
                <NavigationLink
                    content={{ label: menu.label }}
                    key={menu.label}
                    type="serviceAdmin"
                    to={menu.url}
                >
                    {menu.label}
                </NavigationLink>
            ))}
        </div>
    );
}
