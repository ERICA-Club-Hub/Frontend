import { ReactNode } from 'react';
import { serviceAdminMenus } from '@/constants/navigations.constant';
import NavigationLink from '@/domains/shared/components/link/NavigationLink';

export default function ServiceAdminDashboardPage() {
    return (
        <div className="flex flex-col items-center w-full pt-[22px]">
            <AdminSection title="신규 동아리">
                {serviceAdminMenus.NEW_CLUBS.map((menu) => (
                    <NavigationLink
                        content={{ label: menu.label }}
                        key={menu.label}
                        type="serviceAdmin"
                        to={menu.url}
                    >
                        {menu.label}
                    </NavigationLink>
                ))}
            </AdminSection>

            <AdminSection title="등록된 동아리">
                {serviceAdminMenus.REGISTERED_CLUBS.map((menu) => (
                    <NavigationLink
                        content={{ label: menu.label }}
                        key={menu.label}
                        type="serviceAdmin"
                        to={menu.url}
                    >
                        {menu.label}
                    </NavigationLink>
                ))}
            </AdminSection>

            <AdminSection title="기타">
                {serviceAdminMenus.ETC.map((menu) => (
                    <NavigationLink
                        content={{ label: menu.label }}
                        key={menu.label}
                        type="serviceAdmin"
                        to={menu.url}
                    >
                        {menu.label}
                    </NavigationLink>
                ))}
            </AdminSection>
        </div>
    );
}

function AdminSection({
    title,
    children,
}: {
    title: string;
    children: ReactNode;
}) {
    return (
        <section className="flex flex-col gap-[10px] py-[8px]">
            <h2 className="text-b3 text-neutral-900">{title}</h2>
            <div className="flex flex-col gap-[6px]">{children}</div>
        </section>
    );
}
