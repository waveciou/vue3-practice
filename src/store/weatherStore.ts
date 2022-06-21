import { defineStore } from 'pinia';

interface IDetail {
  name: string;
  weather: string;
  coord: {
    lat: number;
    lon: number;
  };
  population: number;
  sunrise: number;
  sunset: number;
  time: number;
}

interface IDataListItem {
  dt: number;
  main: {
    temp_max: number;
    temp_min: number;
    humidity: number;
  };
  weather: { description: string }[];
}

interface ITempData {
  value: number;
  time: number;
}

interface IWeatherData {
  description: string;
  time: number;
}

interface IWeatherStore {
  detail: IDetail | null;
  weatherList: IWeatherData[];
  tempMaxList: ITempData[];
  tempMinList: ITempData[];
  humidity: number | null;
  utcTime: 8;
}

export const useWeatherStore = defineStore({
  id: 'WeatherStore',
  state: (): IWeatherStore => {
    return {
      detail: null,
      weatherList: [],
      tempMaxList: [],
      tempMinList: [],
      humidity: null,
      utcTime: 8,
    };
  },
  actions: {},
});
