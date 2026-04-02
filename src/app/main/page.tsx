import MainContainer from "@/containers/Main/MainServerContainer";

interface MainPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function MainPage({ searchParams }: MainPageProps) {
  const { preference, nx, ny, tmX, tmY } = await searchParams;

  return <MainContainer preference={preference} nx={nx} ny={ny} tmX={tmX} tmY={tmY} />;
}
