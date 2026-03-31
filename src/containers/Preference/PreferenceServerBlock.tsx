import { Flame, Snowflake, Minus } from "lucide-react";

import Layout from "@/components/layout";
import { PreferenceCard, NextButton } from "./PreferenceClientBlock";

export default function PreferenceServerBlock() {
  return (
    <Layout>
      <div className="flex-1 flex flex-col gap-y-4 max-w-md mx-auto w-full">
        <div className="pt-12 pb-8 flex flex-col gap-y-2">
          <h1 className="text-3xl text-gray-800 mb-2">당신에 대해 알려주세요</h1>
          <p className="text-gray-600">평소 어떻게 느끼시나요?</p>
        </div>

        <div className="flex-1 flex flex-col gap-y-4">
          <PreferenceCard id="hot" selectedBg="bg-red-100" selectedBorder="border-red-400" bgColor="bg-red-50" borderColor="border-red-200" title="더위를 많이 타요" description="더운 날씨에 특히 민감해요">
            <Flame className="w-8 h-8 text-red-500" strokeWidth={1.5} />
          </PreferenceCard>
          <PreferenceCard id="cold" selectedBg="bg-blue-100" selectedBorder="border-blue-400" bgColor="bg-blue-50" borderColor="border-blue-200" title="추위를 많이 타요" description="추운 날씨에 특히 민감해요">
            <Snowflake className="w-8 h-8 text-blue-500" strokeWidth={1.5} />
          </PreferenceCard>
          <PreferenceCard id="normal" selectedBg="bg-gray-100" selectedBorder="border-gray-400" bgColor="bg-gray-50" borderColor="border-gray-200" title="보통이에요" description="날씨에 대한 특별한 민감함이 없어요">
            <Minus className="w-8 h-8 text-gray-500" strokeWidth={1.5} />
          </PreferenceCard>
        </div>

        <div className="pt-8 pb-6">
          <NextButton />
        </div>
      </div>
    </Layout>
  );
}
