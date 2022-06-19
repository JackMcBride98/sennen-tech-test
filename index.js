import async from 'async';
import fetch from 'node-fetch';
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}
var randomCoordinates = new Array(100).fill(0).map(function () { return ({
    lat: getRandomIntInclusive(-90, 90),
    lng: getRandomIntInclusive(-180, 180)
}); });
var sunriseSunsetData = [];
var fetchSunriseSunsetData = function (item, callback) {
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
        index: sunriseSunsetData.length
    });
    callback();
};
fetch("https://api.sunrise-sunset.org/json?lat=".concat(randomCoordinates[0].lat, "&lng=").concat(randomCoordinates[0].lng))
    .then(function (response) { return response.json(); })
    .then(function (data) { });
async.eachLimit(randomCoordinates, 5, fetchSunriseSunsetData, function (err) {
    if (err) {
        console.log(err);
    }
    var earliestSunrise = sunriseSunsetData.reduce(function (prev, curr) {
        return prev.sunrise.getTime() < curr.sunrise.getTime() ? prev : curr;
    }, sunriseSunsetData[0]);
    console.log(earliestSunrise.day_length);
});
