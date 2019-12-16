const appId = 'f23369e3f5807afe53622190f6a164e7';
const units = 'metric';
let searchMethod = 'q';
const searchButton = document.querySelector('#searchButton');
const navLogoLink = document.querySelector('#navLink');

navLogoLink.addEventListener('click', () => {
    document.querySelector('#main').style.display = "none";
    document.querySelector('#section').style.display = "block";
});

searchButton.addEventListener('click', () => {
    let inputText = document.querySelector('#input').value;
    inputText ? searchWeather(inputText) : console.log("error");
});

let searchWeather = (searchTerm) => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?${searchMethod}=${searchTerm}&APPID=${appId}&units=${units}`).then(result => {
        return result.json();
    }).then(result => {
        getResult(result, "current");
    });

    fetch(`https://api.openweathermap.org/data/2.5/forecast?${searchMethod}=${searchTerm}&APPID=${appId}&units=${units}`).then(result => {
        return result.json();
    }).then(result => {
        getResult(result, "daily");
    });
}
let getResult = ((resultFromSerwer, arg) => {
    arg == "current" ? (resultFromSerwer.cod == "404" ? alert(resultFromSerwer.message) : getCurrentData(resultFromSerwer)) : console.log('');
    arg == "daily" ? (resultFromSerwer.cod == "404" ? alert(resultFromSerwer.message) : getDailyData(resultFromSerwer)) : console.log('');
});

let getCurrentData = ((data) => {
    document.querySelector('#main').style.display = "flex";
    document.querySelector('#section').style.display = "none";
    //console.log(data);
    document.querySelector('#date').innerHTML = setDateFromUnix(data.dt, 'day');
    document.querySelector('#city').innerHTML = `${data.name}<sup class="main__item--sup">${data.sys.country}</sup>`;
    document.querySelector('#icon').innerHTML = `<img class="icon" src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">`;
    document.querySelector('#weather').innerHTML = data.weather[0].main;
    document.querySelector('#temperature').innerHTML = `${data.main.temp}<sup class="main__item--sup">&#x2103</sup>`;
    document.querySelector('#clouds').innerHTML = `${data.clouds.all}<sup class="item__output--sup">%</sup>`;
    document.querySelector('#pressure').innerHTML = `${data.main.pressure}<sup class="item__output--sup">hPa</sup>`;
    document.querySelector('#humidity').innerHTML = `${data.main.humidity}<sup class="item__output--sup">%</sup>`;
    document.querySelector('#wind').innerHTML = `${data.wind.speed}<sup class="item__output--sup">m/s</sup>`;
    document.querySelector('#tempMin').innerHTML = `${data.main.temp_min}<sup class="item__output--sup">&#x2103</sup>`;
    document.querySelector('#tempMax').innerHTML = `${data.main.temp_max}<sup class="item__output--sup">&#x2103</sup>`;
});

let getDailyData = ((data) => {
    console.log(data);
    let nevElement;
    const dailyWeatherSection = document.querySelector('#dailyWeather');
    for(let i=0; i<data.list.length; i++){
        console.log(i);
        nevElement = document.createElement("div");
        nevElement.className = "daily__item";
        nevElement.innerHTML = `<h3>${setDateFromUnix(data.list[i].dt, 'hour')}</h3>
        ${data.list[i].main.temp}C`;
        dailyWeatherSection.appendChild(nevElement);
    }
});

let setDateFromUnix = ((unixDate, dataVariant) => {
    let date = new Date(unixDate*1000);
    let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var month = months[date.getMonth()];
    let year = date.getFullYear();
    let day = date.getDate();
    let hours = date.getHours();
    let minutes = "0" + date.getMinutes();
    if(dataVariant == 'day'){
        let formattedDate = `${day} ${month} ${year}`;
        return formattedDate;
    }
    else {
        let formattedDate = `${day} ${month} ${year} <br> ${hours}:${minutes.substr(-2)}`;
        return formattedDate;
    }
});
