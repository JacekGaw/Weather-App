const appId = 'f23369e3f5807afe53622190f6a164e7';
const units = 'metric';
let searchMethod = 'q';
const searchButton = document.querySelector('#searchButton');

searchButton.addEventListener('click', () => {
    let inputText = document.querySelector('#input').value;
    inputText ? searchWeather(inputText) : console.log("error");
});

let searchWeather = (searchTerm) => {
    fetch(`http://api.openweathermap.org/data/2.5/weather?${searchMethod}=${searchTerm}&APPID=${appId}&units=${units}`).then(result => {
        return result.json();
    }).then(result => {
        getResult(result);
    });
}

let getResult = ((resultFromSerwer) => {
    resultFromSerwer.cod == "404" ? alert(resultFromSerwer.message) : getData(resultFromSerwer);
});

let getData = ((data) => {
    console.log(data);
    document.querySelector('#city').innerHTML = `${data.name}<sup class="main__item--sup">${data.sys.country}</sup>`;
    document.querySelector('#icon').innerHTML = `<img class="icon" scr="openweathermap.org/img/wn/${data.weather[0].icon}@2x.png/">`;
    document.querySelector('#temperature').innerHTML = `${data.main.temp}<sup class="main__item--sup">&#x2103</sup>`;
    document.querySelector('#clouds').innerHTML = `${data.clouds.all}<sup class="item__output--sup">%</sup>`;
    document.querySelector('#pressure').innerHTML = `${data.main.pressure}<sup class="item__output--sup">hPa</sup>`;
    document.querySelector('#humidity').innerHTML = `${data.main.humidity}<sup class="item__output--sup">%</sup>`;
    document.querySelector('#wind').innerHTML = `${data.wind.speed}<sup class="item__output--sup">m/s</sup>`;
    document.querySelector('#tempMin').innerHTML = `${data.main.temp_min}<sup class="item__output--sup">&#x2103</sup>`;
    document.querySelector('#tempMax').innerHTML = `${data.main.temp_max}<sup class="item__output--sup">&#x2103</sup>`;
});
