import CustomerServiceLayoutClient from "@/components/layout/customer-service-layout/customer-service-layout-client";
import { CUSTOMER_SERVICE } from "@/constants/shared";
import { generatePaths } from "@/lib/utils";
import { navigationService } from "@/services/navigation.service";

export default async function CustomerServiceLayout({ children }: { children: React.ReactNode }) {
  const customerServiceMenu = await navigationService.getMenu(CUSTOMER_SERVICE.handle);
  if (!customerServiceMenu) {
    return <div className="text-muted-foreground text-center">Customer Service Menu not found</div>;
  }
  const navItems = customerServiceMenu.map((item) => ({
    label: item.title,
    href: generatePaths(item.path),
  }));

  return <CustomerServiceLayoutClient navItems={navItems}>{children}</CustomerServiceLayoutClient>;
}
