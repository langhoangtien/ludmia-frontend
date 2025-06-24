import { useRouterState } from "@tanstack/react-router";
import { useMemo } from "react";

export function usePathname() {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });

  return useMemo(() => pathname, [pathname]);
}
