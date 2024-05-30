'use client';
import {useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();



  useEffect(() => {
    if (status === "unauthenticated") {
      router.push(`/auth/login?callbackUrl=${encodeURIComponent(pathname)}`);
    }
  }, [status, router, pathname]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return <>{session ? children : null}</>;
};

export default PrivateRoute;
