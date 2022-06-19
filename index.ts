import async from 'async';
import fetch from 'node-fetch';

interface Coordinates {
  lat: number;
  lng: number;
}

interface SunriseSunset {
  sunrise: Date;
  sunset: Date;
  day_length: number;
  index: number;
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
  // fetch(`https://api.sunrise-sunset.org/json?lat=${item?.lat}&lng=${item?.lng}`)
  //   .then((response) => response.json())
  //   .then((data: any) => {
  //     sunriseSunsetData.push(data);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
  sunriseSunsetData.push({
    sunrise: new Date(Math.random() * 1655642707 * 1000),
    sunset: new Date('2015-05-21T19:22:59+00:00'),
    day_length: 51444,
    index: sunriseSunsetData.length,
  });
  callback();
};

fetch(
  `https://api.sunrise-sunset.org/json?lat=${randomCoordinates[0].lat}&lng=${randomCoordinates[0].lng}`
)
  .then((response) => response.json())
  .then((data) => {});

async.eachLimit(randomCoordinates, 5, fetchSunriseSunsetData, function (err) {
  if (err) {
    console.log(err);
  }
  const earliestSunrise = sunriseSunsetData.reduce(
    (prev, curr) =>
      prev.sunrise.getTime() < curr.sunrise.getTime() ? prev : curr,
    sunriseSunsetData[0]
  );
  console.log(earliestSunrise.day_length);
});
