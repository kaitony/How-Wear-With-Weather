import { Cloud, Sun, Shirt } from "lucide-react";

import Layout from "@/components/layout";

export default function SplashServerBlock() {
  return (
    <Layout>
      <div className="flex flex-col items-center gap-6 animate-fade-in">
        <Logo />
        <h1 className="text-4xl text-center font-bold tracking-tight text-gray-700">
          How Wear
          <br />
          <span className="text-3xl text-red-400">with </span>
          Weather
        </h1>
        <p className="text-md font-semibold text-gray-500 tracking-wide">날씨에 맞게, 편안하게</p>
      </div>
    </Layout>
  );
}

function Logo() {
  return (
    <div className="relative">
      <Shirt className="w-24 h-24 text-indigo-400" strokeWidth={1.5} />
      <Cloud className="w-10 h-10 text-blue-300 absolute -top-2 -right-2" strokeWidth={1.5} />
      <Sun className="w-8 h-8 text-yellow-300 absolute -bottom-1 -left-1" strokeWidth={1.5} />
    </div>
  );
}
