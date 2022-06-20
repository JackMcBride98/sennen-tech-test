import async from 'async';
import fetch from 'node-fetch';

interface Coordinates {
  lat: number;
  lng: number;
}

interface SunriseSunset {
  sunrise: string;
  sunset: string;
  day_length: number;
}

function getRandomIntInclusive(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const randomCoordinates: Coordinates[] = new Array(100).fill(0).map(() => ({
  lat: getRandomIntInclusive(-90, 90),
  lng: getRandomIntInclusive(-180, 180),
}));

const sunriseSunsetData: SunriseSunset[] = [];

const fetchSunriseSunsetData = function (item, callback) {
  fetch(
    `https://api.sunrise-sunset.org/json?lat=${item?.lat}&lng=${item?.lng}&formatted=0`
  )
    .then((response) => response.json())
    .then((data: any) => {
      sunriseSunsetData.push(data.results);
      callback();
    })
    .catch((err) => {
      console.log(err);
      callback();
    });
};

async.eachLimit(randomCoordinates, 5, fetchSunriseSunsetData, function (err) {
  if (err) {
    console.log(err);
  }
  const filteredSunriseSunsetData = sunriseSunsetData.filter(
    (item) =>
      item.sunrise !== '1970-01-01T00:00:00+00:00' &&
      item.sunrise !== '1970-01-01T00:00:01+00:00'
  );

  const earliestSunrise = filteredSunriseSunsetData.reduce((prev, curr) =>
    new Date(prev.sunrise).getTime() < new Date(curr.sunrise).getTime()
      ? prev
      : curr
  );
  console.log(earliestSunrise);
});
