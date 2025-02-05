"use client";

import { useAuthStore } from "@/store/use-auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion"


const withAuth = <P extends object>(Component: React.ComponentType<P>) => {
  return function AuthenticatedComponent(props: P) {
    const { isLoggedIn, checkAuth } = useAuthStore();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true); // Add a loading state

    useEffect(() => {
      const authenticate = async () => {
        const authenticated = await checkAuth();
        if (!authenticated) {
          router.push("/auth/login"); // Redirect unauthenticated users
        }
        setIsLoading(false); // Authentication complete
      };

      authenticate();
    }, [checkAuth, router]);

    if (isLoading) {
      return (
        <div className="flex items-center justify-center text-white bg-[#000000] h-screen w-full">
            <div className="flex items-center gap-2">
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                />
                <div>Loading..</div>
            </div>
        </div>
      ); // Loading UI while checking auth
    }

    if (!isLoggedIn()) {
      return null; // Prevent rendering unauthorized content
    }

    return <Component {...props} />;
  };
};

export default withAuth;