import { auth } from "@/auth";
import Signup from "@/component/auth/Signup";
import { redirect } from "next/navigation";

const getCallbackUrl = (value: string | string[] | undefined) => {
  const callbackUrl = Array.isArray(value) ? value[0] : value;
  return callbackUrl?.startsWith("/") && !callbackUrl.startsWith("//")
    ? callbackUrl
    : "/";
};

const page = async ({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string | string[] }>;
}) => {
  const { callbackUrl: rawCallbackUrl } = await searchParams;
  const callbackUrl = getCallbackUrl(rawCallbackUrl);
  const session = await auth();

  if (session?.user) redirect(callbackUrl);

  return <Signup callbackUrl={callbackUrl} />;
};

export default page;
