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
    fetch("https://api.sunrise-sunset.org/json?lat=".concat(item === null || item === void 0 ? void 0 : item.lat, "&lng=").concat(item === null || item === void 0 ? void 0 : item.lng, "&formatted=0"))
        .then(function (response) { return response.json(); })
        .then(function (data) {
        sunriseSunsetData.push(data.results);
        callback();
    })["catch"](function (err) {
        console.log(err);
        callback();
    });
};
async.eachLimit(randomCoordinates, 5, fetchSunriseSunsetData, function (err) {
    if (err) {
        console.log(err);
    }
    var filteredSunriseSunsetData = sunriseSunsetData.filter(function (item) {
        return item.sunrise !== '1970-01-01T00:00:00+00:00' &&
            item.sunrise !== '1970-01-01T00:00:01+00:00';
    });
    var earliestSunrise = filteredSunriseSunsetData.reduce(function (prev, curr) {
        return new Date(prev.sunrise).getTime() < new Date(curr.sunrise).getTime()
            ? prev
            : curr;
    });
    console.log(earliestSunrise);
});
