import { auth } from "@/auth";
import Navbar, { type NavbarUser } from "@/component/layout/Navbar";

const AuthenticatedNavbar = async () => {
  const session = await auth();
  const user: NavbarUser | null = session?.user
    ? {
        name: session.user.name ?? null,
        email: session.user.email ?? null,
        image: session.user.image ?? null,
      }
    : null;

  return <Navbar user={user} />;
};

export default AuthenticatedNavbar;
