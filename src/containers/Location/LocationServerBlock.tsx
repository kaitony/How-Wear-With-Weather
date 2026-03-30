import Layout from "@/components/layout";

export default function LocationServerBlock() {
  return (
    <Layout>
      <div className="flex-1 flex flex-col gap-y-4 max-w-md mx-auto w-full">
        <div className="pt-12 pb-8 flex flex-col gap-y-2">
          <h1 className="text-3xl text-gray-800 mb-2">어디에 계신가요?</h1>
          <p className="text-gray-600">위치를 기반으로 날씨에 맞는 옷차림을 추천해드릴게요.</p>
        </div>
      </div>
    </Layout>
  );
}
