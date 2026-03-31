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
