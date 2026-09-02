import { auth } from "@/auth";
import Navbar, { type NavbarUser } from "@/component/layout/Navbar";

const AuthenticatedNavbar = async () => {
  let user: NavbarUser | null = null;
  try {
    const session = await auth();
    if (session?.user) {
      user = {
        name: session.user.name ?? null,
        email: session.user.email ?? null,
        image: session.user.image ?? null,
      };
    }
  } catch (error: unknown) {
    const err = error as { digest?: string; message?: string };
    if (
      err?.digest === "DYNAMIC_SERVER_USAGE" ||
      err?.message?.includes("DYNAMIC_SERVER_USAGE")
    ) {
      throw error;
    }
    user = null;
  }

  return <Navbar user={user} />;
};

export default AuthenticatedNavbar;
