import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return <div className="bg-linear-to-br from-blue-100 via-purple-50 to-yellow-100">{children}</div>;
}
