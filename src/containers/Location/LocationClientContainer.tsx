"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";

import { useLocationStore } from "@/states/location";

export default function LocationClientContainer({ children }: { children: ReactNode }) {
  const router = useRouter();

  const { setLocation } = useLocationStore();

  return <>{children}</>;
}
