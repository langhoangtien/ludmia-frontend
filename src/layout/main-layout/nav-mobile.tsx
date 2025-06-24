import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Menu, UserIcon } from "lucide-react";

import { menu } from "./nav-desktop";
import SearchHeader from "./search";
import CartHeader from "./cart-header";
import { Link } from "@tanstack/react-router";

export default function NavMobile() {
  return (
    <div className="grid grid-cols-3 space-x-1 py-2 px-4">
      <Sheet>
        <SheetTrigger asChild>
          <div className="flex space-x-8 justify-start items-center">
            {" "}
            <Menu strokeWidth={1} size={24}></Menu>
          </div>
        </SheetTrigger>
        <SheetContent
          onOpenAutoFocus={(e) => e.preventDefault()}
          side={"left"}
          className="w-9/10 max-w-md"
          showClose={false}
        >
          <SheetHeader className="border-b border-border">
            <SheetTitle className="text-2xl font-extrabold">Menu</SheetTitle>
            <SheetDescription></SheetDescription>
          </SheetHeader>
          <div>
            <div className="flex flex-col space-y-4 p-4 border-b border-border">
              {menu.map((item) => (
                <Link
                  key={item.name}
                  className="text-xl font-normal uppercase"
                  to={item.link}
                >
                  {item.name}
                </Link>
              ))}
            </div>
            <div className=" p-4">
              <Link to="/login" className="flex space-x-2 items-center ">
                <UserIcon size={22} />
                <span className="font-bold">Login</span>
              </Link>
            </div>
          </div>
          <SheetFooter>
            <SheetClose asChild>
              {/* <Button type="submit">Save changes</Button> */}
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      <div className="flex justify-center items-center">
        <Link to="/" className="font-extrabold text-2xl">
          QUITMOOD.
        </Link>
      </div>
      <span className="flex  items-center justify-end">
        <SearchHeader />
        <CartHeader />
      </span>
    </div>
  );
}
