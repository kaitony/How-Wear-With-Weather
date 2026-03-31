import MainContainer from "@/containers/Main/MainServerContainer";

interface MainPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function MainPage({ searchParams }: MainPageProps) {
  const { preference, latitude, longitude } = await searchParams;

  return <MainContainer preference={preference} latitude={latitude} longitude={longitude} />;
}
