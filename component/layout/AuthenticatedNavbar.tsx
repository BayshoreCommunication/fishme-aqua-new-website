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
  } catch (error) {
    console.error("AuthenticatedNavbar auth check failed:", error);
    user = null;
  }

  return <Navbar user={user} />;
};

export default AuthenticatedNavbar;
