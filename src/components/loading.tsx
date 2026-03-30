"use client";

import {Spinner} from "@/components/spinner";

export default function LoadingScreen() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-300">
      <Spinner className="size-20 text-gray-700"/>
    </div>
  );
}
