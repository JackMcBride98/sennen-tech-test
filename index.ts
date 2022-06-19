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

const randomCoordinates: Coordinates[] = new Array(0).fill(0).map(() => ({
  lat: getRandomIntInclusive(-90, 90),
  lng: getRandomIntInclusive(-180, 180),
}));

const sunriseSunsetData: SunriseSunset[] = [];

const fetchSunriseSunsetData = function (item, callback) {
  fetch(`https://api.sunrise-sunset.org/json?lat=${item?.lat}&lng=${item?.lng}`)
    .then((response) => response.json())
    .then((data: any) => {
      sunriseSunsetData.push(data);
    })
    .catch((err) => {
      console.log(err);
    });
  callback();
};

async.eachLimit(randomCoordinates, 5, fetchSunriseSunsetData, function (err) {
  if (err) {
    console.log(err);
  }
  const earliestSunrise = sunriseSunsetData.reduce(
    (prev, curr) =>
      new Date(prev.sunrise).getTime() < new Date(curr.sunrise).getTime()
        ? prev
        : curr,
    sunriseSunsetData[0]
  );
  console.log(earliestSunrise);
});
