import async from 'async';
import fetch from 'node-fetch';
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}
var randomCoordinates = new Array(0).fill(0).map(function () { return ({
    lat: getRandomIntInclusive(-90, 90),
    lng: getRandomIntInclusive(-180, 180)
}); });
var sunriseSunsetData = [];
var fetchSunriseSunsetData = function (item, callback) {
    fetch("https://api.sunrise-sunset.org/json?lat=".concat(item === null || item === void 0 ? void 0 : item.lat, "&lng=").concat(item === null || item === void 0 ? void 0 : item.lng))
        .then(function (response) { return response.json(); })
        .then(function (data) {
        sunriseSunsetData.push(data);
    })["catch"](function (err) {
        console.log(err);
    });
    callback();
};
async.eachLimit(randomCoordinates, 5, fetchSunriseSunsetData, function (err) {
    if (err) {
        console.log(err);
    }
    var earliestSunrise = sunriseSunsetData.reduce(function (prev, curr) {
        return new Date(prev.sunrise).getTime() < new Date(curr.sunrise).getTime()
            ? prev
            : curr;
    }, sunriseSunsetData[0]);
    console.log(earliestSunrise);
});
