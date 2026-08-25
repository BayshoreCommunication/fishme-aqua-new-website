import Breadcrumb from "@/component/shared/Breadcrumb";
import Wishlist from "@/component/wishlist/Wishlist";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wishlist",
  description: "View your saved Fish Me Aqua products.",
};

const WishlistPage = () => (
  <div>
    <Breadcrumb
      firstPart="Your Aquatic"
      lastWord="Wishlist"
      backgroundImage="/assets/home/hero-bg.svg"
    />
    <Wishlist />
  </div>
);

export default WishlistPage;
