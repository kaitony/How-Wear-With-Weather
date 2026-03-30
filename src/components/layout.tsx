import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return <div className="min-h-screen flex flex-col items-center justify-center bg-linear-to-br from-blue-100 via-purple-50 to-yellow-100 p-6">{children}</div>;
}
