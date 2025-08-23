import ResetPasswordForm from "@/components/shared/auth/reset-password-form";
import { CUSTOMER } from "@/constants/shared";

type ComponentProps = {
  params: Promise<{ slug: string[] | undefined }>;
};

async function ResetPasswordPage({ params }: ComponentProps) {
  const { slug } = await params;
  return (
    <div className="mx-auto mt-16 w-full px-6 py-10 md:w-[400px] md:px-10 2xl:px-20">
      <h1 className="text-2xl">{CUSTOMER.resetPassword}</h1>
      <ResetPasswordForm slug={slug} />
    </div>
  );
}

export default ResetPasswordPage;
