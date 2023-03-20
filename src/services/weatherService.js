import { Settings, DateTime } from 'luxon';
import axios from 'axios';

const API_KEY = '35b70f9b28b67917f925491d2c2246e3';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';
const LANGUAGE = 'ua';
Settings.defaultLocale = 'uk';

const getWeatherData = async (infoType, searchParams) => {
  const url = new URL(BASE_URL + '/' + infoType);
  url.search = new URLSearchParams({
    ...searchParams,
    lang: LANGUAGE,
    appid: API_KEY,
  });

  return axios.get(url).then(res => res.data);
};

const formatCurrentWeather = data => {
  const {
    coord: { lat, lon },
    main: { temp, feels_like, temp_min, temp_max, humidity },
    name,
    dt,
    sys: { country, sunrise, sunset },
    weather,
    wind: { speed },
  } = data;

  const { description, icon } = weather[0];
  return {
    lat,
    lon,
    temp,
    feels_like,
    temp_min,
    temp_max,
    humidity,
    name,
    dt,
    country,
    sunrise,
    sunset,
    icon,
    speed,
    description,
  };
};

const formatForecastWeather = data => {
  let {
    city: { timezone },
    list,
  } = data;

  timezone = `UTC+${timezone / 3600}`.replace('+-', '-');

  let daily = [];
  for (let i = 0; i < list.length; i++) {
    if (!(i % 8)) {
      daily.push(list[i]);
    }
  }

  daily = daily.map(d => {
    return {
      title: formatToLocalTime(d.dt, timezone, 'cccc'),
      temp: d.main.temp,
      icon: d.weather[0].icon,
    };
  });

  let everyThreeHours = list.slice(0, 5).map(d => {
    return {
      title: formatToLocalTime(d.dt, timezone, 'T'),
      temp: d.main.temp,
      icon: d.weather[0].icon,
    };
  });
  return { timezone, daily, everyThreeHours };
};

const getFormattedWeatherData = async searchParams => {
  const formattedCurrentWeather = await getWeatherData(
    'weather',
    searchParams
  ).then(formatCurrentWeather);

  const { lat, lon } = formattedCurrentWeather;

  const formattedForecastWeather = await getWeatherData('forecast', {
    lat,
    lon,
    units: searchParams.units,
  }).then(formatForecastWeather);

  return { ...formattedCurrentWeather, ...formattedForecastWeather };
};

const formatToLocalTime = (
  secs,
  zone,
  format = "dd MMM yyyy' | місцевий час: 'T"
) => DateTime.fromSeconds(secs).setZone(zone).toFormat(format);

const iconUrlFromCode = code =>
  `https://openweathermap.org/img/wn/${code}@2x.png`;

export { getFormattedWeatherData, formatToLocalTime, iconUrlFromCode };
