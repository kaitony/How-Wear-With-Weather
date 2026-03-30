"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";

import { useLocationStore } from "@/states/location";

export default function LocationClientContainer({ children }: { children: ReactNode }) {
  const router = useRouter();

  const location = typeof window !== "undefined" ? localStorage.getItem("location") : null;

  const { setLocation } = useLocationStore();

  useEffect(() => {
    typeof window !== "undefined"
      ? window.navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setLocation(latitude, longitude);
          },
          (error) => {
            console.error("Geolocation error:", error);
            router.replace("/main");
          },
        )
      : router.replace("/bodytemperature");
  }, []);

  return <>{children}</>;
}
