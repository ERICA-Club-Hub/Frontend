import { NavigationLink } from '@/components/Common';
import { serviceAdminMenus } from '@/routes/paths';

export default function ServiceAdminPage() {
    return (
        <div className="flex flex-col items-center gap-[10px] w-full pt-[22px]">
            {serviceAdminMenus.map((menu) => (
                <NavigationLink key={menu.label} size="large" url={menu.url}>
                    {menu.label}
                </NavigationLink>
            ))}
        </div>
    );
}
