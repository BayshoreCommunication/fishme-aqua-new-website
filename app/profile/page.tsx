import { getCustomerOrdersAction } from "@/app/actions/order";
import { getMeAction } from "@/app/actions/user";
import { auth } from "@/auth";
import ProfileView from "@/component/profile/ProfileView";
import Breadcrumb from "@/component/shared/Breadcrumb";
import { redirect } from "next/navigation";

const page = async () => {
  const session = await auth();
  if (!session?.user) {
    redirect("/sign-in?callbackUrl=%2Fprofile");
  }

  const [profileResult, ordersResult] = await Promise.all([
    getMeAction(),
    getCustomerOrdersAction(1),
  ]);

  if (!profileResult.ok) {
    if (!profileResult.authenticated) {
      redirect("/sign-in?callbackUrl=%2Fprofile");
    }

    return (
      <div>
        <Breadcrumb
          firstPart="Your Profile"
          lastWord="Details"
          backgroundImage="/assets/home/hero-bg.svg"
        />
        <section className="container py-16">
          <div className="mx-auto max-w-xl rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-center text-sm font-bold text-red-700">
            {profileResult.error || "Unable to load your profile."}
          </div>
        </section>
      </div>
    );
  }

  return (
    <div>
      <Breadcrumb
        firstPart="Your Profile"
        lastWord="Details"
        backgroundImage="/assets/home/hero-bg.svg"
      />
      <ProfileView
        initialProfile={profileResult.data}
        initialOrders={ordersResult}
      />
    </div>
  );
};

export default page;
