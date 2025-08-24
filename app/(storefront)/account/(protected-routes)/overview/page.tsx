import { getCustomer } from "@/app/actions/auth";
import SignOutForm from "@/components/shared/auth/sign-out-form";
import { ROUTES } from "@/constants/routes";
import { GENERICS, MY_ACCOUNT } from "@/constants/shared";
import { redirect } from "next/navigation";

async function MyAccountOverviewPage() {
  const customer = await getCustomer();
  if (!customer) redirect(ROUTES.account);
  const { defaultAddress: address } = customer;
  return (
    <div>
      <h1 className="mb-10 text-2xl">{GENERICS.overview}</h1>
      <div className="flex flex-col space-y-10 pb-10">
        <h3 className="text-lg font-semibold">{MY_ACCOUNT.recentOrders}</h3>
        <p className="text-sm">{MY_ACCOUNT.noRecentOrdersText}</p>
      </div>
      <div className="pb-4">
        <h3 className="mb-6 text-lg font-semibold">{MY_ACCOUNT.billyAdress}</h3>
        <div className="mb-6 border-b" />
        {address ? (
          <div className="mb-6 text-xs">
            <div>
              {address.firstName} {address.lastName}
            </div>
            <div>
              {address.address1} {address.address2}
            </div>
            <div>
              {address.zip} {address.city}
            </div>
            <div>{address.country}</div>
            {address.phone && <div>{address.phone}</div>}
          </div>
        ) : (
          <p className="mb-6 text-sm">{MY_ACCOUNT.noAddressText}</p>
        )}
        <div className="mb-6 border-b" />
      </div>
      <SignOutForm />
    </div>
  );
}

export default MyAccountOverviewPage;
