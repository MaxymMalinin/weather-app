import { Settings, DateTime } from 'luxon';

const API_KEY = '35b70f9b28b67917f925491d2c2246e3';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';
Settings.defaultLocale = 'uk';

const getWeatherData = (infoType, searchParams) => {
  const url = new URL(BASE_URL + '/' + infoType);
  url.search = new URLSearchParams({ ...searchParams, appid: API_KEY });

  return fetch(url).then(res => res.json());
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

  const { main: details, icon } = weather[0];

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
    details,
    icon,
    speed,
  };
};

const formatForecastWeather = data => {
  let {
    city: { timezone },
    list,
  } = data;

  let daily = [];
  for (let i = 0; i < list.length; i++) {
    if ((!(i % 8) && i !== 0) || i === 39) {
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

  let everyThreeHours = list.slice(1, 6).map(d => {
    return {
      title: formatToLocalTime(d.dt, timezone, 'HH:mm'),
      temp: d.temp,
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
  format = "cccc, dd LLL yyyy' | Local time: 'HH:mm"
) => DateTime.fromSeconds(secs).setZone(zone).toFormat(format);

export default getFormattedWeatherData;
