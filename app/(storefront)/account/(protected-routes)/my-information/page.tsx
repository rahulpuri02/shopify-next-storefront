import { getCustomer } from "@/app/actions/auth";
import ChangePasswordForm from "@/components/shared/auth/change-password-forn";
import MyInformationForm from "@/components/shared/customer/my-information-form";
import { GENERICS } from "@/constants/shared";
import { redirect } from "next/navigation";

async function MyInformationPage() {
  const customer = await getCustomer();
  if (!customer) return redirect("/account");

  return (
    <div>
      <h1 className="mb-10 text-2xl">{GENERICS.myInformation}</h1>
      <MyInformationForm customer={customer} />
      <ChangePasswordForm />
    </div>
  );
}

export default MyInformationPage;
