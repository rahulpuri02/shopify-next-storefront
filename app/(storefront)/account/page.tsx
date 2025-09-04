import { getCustomer } from "@/app/actions/auth";
import CreateAccountForm from "@/components/shared/auth/create-account-form";
import SignInForm from "@/components/shared/auth/sign-in-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ROUTES } from "@/constants/routes";
import { CUSTOMER } from "@/constants/shared";
import { redirect } from "next/navigation";

export const metadata = {
  title: "My Account | CN 74®",
};

async function MyAccountPage() {
  const customer = await getCustomer();
  if (customer) return redirect(ROUTES.accountOverview);
  return (
    <div className="mt-16 px-6 py-10 md:px-10 2xl:px-20">
      <div className="mx-auto block w-full">
        <h1 className="mb-10 text-center text-2xl uppercase">My account</h1>
        <Tabs defaultValue="signin" className="flex items-center">
          <TabsList className="mt-3 mb-10 flex w-[400px] items-center justify-center space-x-2">
            <TabsTrigger
              value="signin"
              className="text-gray-500 uppercase data-[state=active]:font-semibold data-[state=active]:text-black"
            >
              {CUSTOMER.signIn}
            </TabsTrigger>
            <TabsTrigger
              value="create-account"
              className="text-gray-500 uppercase data-[state=active]:font-semibold data-[state=active]:text-black"
            >
              {CUSTOMER.createAccount}
            </TabsTrigger>
          </TabsList>
          <TabsContent className="flex w-full items-center justify-center" value="signin">
            <SignInForm />
          </TabsContent>
          <TabsContent className="flex w-full items-center justify-center" value="create-account">
            <CreateAccountForm />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default MyAccountPage;
