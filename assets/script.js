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
    console.log(resultFromSerwer);
    resultFromSerwer.cod == "404" ? document.querySelector('#city').innerHTML = resultFromSerwer.message : getData(resultFromSerwer);
});

let getData = ((data) => {
    document.querySelector('#city').innerHTML = `${data.name}<sup class="main__city--country">${data.sys.country}</sup>`;
    document.querySelector('#icon').innerHTML = `<img class="icon" scr="openweathermap.org/img/wn/${data.weather[0].icon}@2x.png/">`;
    document.querySelector('#temperature').innerHTML = `${data.main.temp}&#x2103`;
    document.querySelector('#clouds').innerHTML = `${data.clouds.all}%`;
    document.querySelector('#pressure').innerHTML = `${data.main.pressure}hPa`;
    document.querySelector('#humidity').innerHTML = `${data.main.humidity}%`;
    document.querySelector('#wind').innerHTML = `${data.wind.speed}m/s`;
    document.querySelector('#tempMin').innerHTML = `${data.main.temp_min}&#x2103`;
    document.querySelector('#tempMax').innerHTML = `${data.main.temp_max}&#x2103`;
});
