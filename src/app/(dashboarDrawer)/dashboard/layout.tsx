'use client'
import { useEffect, useState } from "react";
import { useSession, getSession } from "next-auth/react";
import PrivateRoute from "@/components/PrivateRoute";
import Sidebar from "@/components/Shared/Sidebar";
import UnAthorizedPage from "@/components/UnAthurizedPage";
import Spinner from "@/components/Spinner";

const DashboardLayout = ({ children }: any) => {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const session = await getSession() as any;
        if (session?.user?.role === "ADMIN") {
          setIsAdmin(true);
        }
      } catch (error) {
        console.error("Error fetching session:", error);
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, []);

  if (loading || status === 'loading') {
    return <Spinner/>;
  }

  if (!isAdmin) {
    return <UnAthorizedPage />;
  }

  return (
    <div className="pt-16 bg-white">
      <PrivateRoute>
        <Sidebar>{children}</Sidebar>
      </PrivateRoute>
    </div>
  );
};

export default DashboardLayout;
