import { getCustomer } from "@/app/actions/auth";
import MyInformationForm from "@/components/my-account/my-information-form";
import { redirect } from "next/navigation";

async function MyInformationPage() {
  const customer = await getCustomer();
  if (!customer) return redirect("/my-account");

  return (
    <div>
      <h1 className="mb-10 text-2xl">My information</h1>
      <MyInformationForm customer={customer} />
      <h1 className="mt-14 mb-6 text-xl">Change password</h1>
      {/* <form>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="flex flex-col space-y-2">
            <Label htmlFor="password" className="text-xs uppercase">
              Password *
            </Label>
            <Input name="password" type="password" required />
          </div>
          <div className="flex flex-col space-y-2">
            <Label htmlFor="repeatPassword" className="text-xs uppercase">
              Repeat Password *
            </Label>
            <Input name="repeatPassword" type="password" required />
          </div>
          <div className="flex flex-col space-y-2">
            <Label htmlFor="currentPassword" className="text-xs uppercase">
              Current Password *
            </Label>
            <Input name="currentPassword" type="password" required />
          </div>
        </div>

        <Button type="submit" size={"lg"} className="mt-6 text-xs font-normal uppercase">
          Update
        </Button>
      </form> */}
    </div>
  );
}

export default MyInformationPage;
