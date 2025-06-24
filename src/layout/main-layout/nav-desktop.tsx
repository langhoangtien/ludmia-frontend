import { Link, useMatchRoute } from "@tanstack/react-router";
import { User2Icon } from "lucide-react";
import SearchHeader from "./search";
import CartHeader from "./cart-header";

export const menu = [
  { name: "Home", link: "/" },
  { name: "Products", link: "/search" },
  { name: "Buy", link: "/products/purfect-fuel-blend" },
  { name: "Contact", link: "/contact-us" },
];
export default function NavDesktop() {
  const matchRoute = useMatchRoute();

  return (
    <div className="flex flex-col justify-center  space-y-8 ">
      <div className="grid grid-cols-3 space-x-1 py-2 px-4">
        <div className="flex space-x-8 justify-start items-center">
          {menu.map((item) => (
            <Link
              key={item.name}
              className={`text-sm font-normal uppercase   ${
                matchRoute({ to: item.link })
                  ? "bg-primary/80 text-background px-2 rounded-md"
                  : "hover:text-primary/80"
              }`}
              to={item.link}
            >
              {item.name}
            </Link>
          ))}
        </div>
        <div className="flex justify-center items-center">
          <Link to="/" className="font-extrabold text-3xl">
            QUITMOOD.
          </Link>
        </div>

        <span className="flex  items-center justify-end">
          <SearchHeader />
          <CartHeader />
          <Link to="/login">
            <div className="relative size-11 flex items-center justify-center cursor-pointer">
              {" "}
              <User2Icon
                strokeWidth={1}
                size={22}
                className="text-accent-foreground"
              />
            </div>
          </Link>
        </span>
      </div>
    </div>
  );
}
