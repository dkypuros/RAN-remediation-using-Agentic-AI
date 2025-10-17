'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/AuthContext";

export default function Dashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (user) {
        router.push("/admin/welcome");
      } else {
        router.push("/login");
      }
    }
  }, [user, loading, router]);

  // Show nothing while checking auth state
  return null;
}
