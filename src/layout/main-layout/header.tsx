import NavMobile from "./nav-mobile";
import { useIsMobile } from "@/hooks/use-mobile";
import NavDesktop from "./nav-desktop";

export default function Header() {
  const isMobile = useIsMobile();
  return (
    <header className="w-full sticky top-0 z-50  bg-background/90 shadow-md ">
      {/* <CarouselHeader /> */}
      <div className="mx-auto max-w-7xl md:p-2">
        {" "}
        {isMobile ? <NavMobile /> : <NavDesktop />}
      </div>
    </header>
  );
}
