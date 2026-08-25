import { getMeAction } from "@/app/actions/user";
import { auth } from "@/auth";
import CheckoutView from "@/component/checkout/CheckoutView";
import Breadcrumb from "@/component/shared/Breadcrumb";
import { redirect } from "next/navigation";

const page = async () => {
  const session = await auth();

  if (!session?.user) {
    redirect("/sign-in?callbackUrl=%2Fcheckout");
  }

  const profileResult = await getMeAction();

  return (
    <>
      <Breadcrumb title="Checkout" backgroundImage="/assets/home/hero-bg.svg" />
      <CheckoutView
        initialUser={profileResult.ok ? profileResult.data : null}
      />
    </>
  );
};

export default page;
