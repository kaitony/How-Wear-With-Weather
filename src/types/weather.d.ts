interface WeatherInfoType {
  [date: string]: {
    detailed: {
      [time: string]: {
        [category: string]: string;
      };
    };
    tempMax: number;
    tempMin: number;
    morning: string;
    afternoon: string;
    evening: string;
    humidity: number;
    windSpeed: number;
    feelsLike: number;
    outfit: string[];
  };
}

interface AirInfoType {
  so2Grade: string;
  coFlag: string | null;
  khaiValue: string;
  so2Value: string;
  coValue: string;
  pm25Flag: string | null;
  pm10Flag: string | null;
  pm10Value: string;
  o3Grade: string;
  khaiGrade: string;
  pm25Value: string;
  no2Flag: string | null;
  no2Grade: string;
  o3Flag: string | null;
  pm25Grade: string;
  so2Flag: string | null;
  dataTime: string;
  coGrade: string;
  no2Value: string;
  pm10Grade: string;
  o3Value: string;
}
