"use client";

import CreateAccountForm from "@/components/shared/auth/create-account-form";
import SignInForm from "@/components/shared/auth/sign-in-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function MyAccountPage() {
  return (
    <div className="mt-12 px-6 py-10 md:mt-16 md:px-10 2xl:px-20">
      <div className="mx-auto block w-full">
        <h1 className="mb-10 text-center text-2xl">My account</h1>
        <Tabs defaultValue="signin" className="flex items-center">
          <TabsList className="mb-10 flex w-[400px] items-center justify-center space-x-2">
            <TabsTrigger
              value="signin"
              className="text-gray-500 data-[state=active]:font-bold data-[state=active]:text-black"
            >
              SIGN IN
            </TabsTrigger>
            <TabsTrigger
              value="create-account"
              className="text-gray-500 data-[state=active]:font-bold data-[state=active]:text-black"
            >
              CREATE ACCOUNT
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
