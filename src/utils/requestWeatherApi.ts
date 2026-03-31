import dayjs from "dayjs";

interface WeatherApiResponse {
  baseDate: string;
  baseTime: string;
  category: string;
  fcstDate: string;
  fcstTime: string;
  fcstValue: string;
  nx: number;
  ny: number;
}

export async function requestWeatherInfo(latitude: string, longitude: string): Promise<WeatherApiResponse[]> {
  const pageNo = 1;
  const numOfRows = 1000;
  const dataType = "JSON";
  const base_date = dayjs().format("YYYYMMDD");
  const base_time = "0500";
  const nx = latitude;
  const ny = longitude;
  const authKey = process.env.NEXT_PUBLIC_KMA_API_KEY;

  const response = await fetch(`https://apihub.kma.go.kr/api/typ02/openApi/VilageFcstInfoService_2.0/getVilageFcst?pageNo=${pageNo}&numOfRows=${numOfRows}&dataType=${dataType}&base_date=${base_date}&base_time=${base_time}&nx=${nx}&ny=${ny}&authKey=${authKey}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch weather information");
  }

  const data = await response.json();
  return data.response.body.items.item;
}
