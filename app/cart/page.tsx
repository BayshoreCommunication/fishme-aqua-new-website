import type { Metadata } from "next";
import Breadcrumb from "@/component/shared/Breadcrumb";
import ShoppingCart from "@/component/shoppingCart/ShoppingCart";

export const metadata: Metadata = {
  title: "Shopping Cart",
  description: "Review your selected Fish Me Aqua products.",
};

const CartPage = () => (
  <>
    <Breadcrumb
      firstPart="Your Shopping"
      lastWord="Cart"
      backgroundImage="/assets/home/hero-bg.svg"
    />
    <ShoppingCart />
  </>
);

export default CartPage;
