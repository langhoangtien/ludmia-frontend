import { LogoWithLink } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Link, useMatchRoute } from "@tanstack/react-router";
import { ShoppingCart } from "lucide-react";
import SearchHeader from "./search";

export const menu = [
  { name: "About Us", link: "/" },
  { name: "Buy", link: "/" },
  { name: "Contact", link: "/admin/user" },
  { name: "Track Order", link: "/admin" },
];

export default function NavDesktop() {
  const matchRoute = useMatchRoute();

  return (
    <div className="flex flex-col justify-center  space-y-8 ">
      <div className="flex justify-between items-center space-x-1 py-2 px-4">
        <LogoWithLink />
        <div className="flex space-x-8 justify-center">
          {menu.map((item) => (
            <Link
              key={item.name}
              className={`text-base font-normal border-b-2 hover:border-accent-foreground  py-1 ${
                matchRoute({ to: item.link })
                  ? "border-gray-700"
                  : "border-transparent"
              }`}
              to={item.link}
            >
              {item.name}
            </Link>
          ))}
        </div>
        <span className="flex space-x-2 items-center ">
          <SearchHeader />
          <Button size="icon" variant="outline">
            {" "}
            <ShoppingCart
              strokeWidth={1}
              className="text-accent-foreground"
              size={24}
            />
          </Button>
        </span>
      </div>
    </div>
  );
}
