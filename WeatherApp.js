console.log(" Weather App using weather API ");
const API_KEY = "";

function renderWeatherInfo(data) {
  //To show this in the UI. Created a new para.
  let newPara = document.createElement('p');
  newPara.textContent = `${(data?.main?.temp.toFixed(2))} °C`;
  document.body.appendChild(newPara);
}

//Async function will return a promise.Each time when an async function is called, it returns a new Promise which will be resolved with the value returned by the async function, or rejected with an exception uncaught within the async function.
async function fetchWeatherCity() {
  try {
    let city = "delhi";
    //Use latitude and longitude only if you are giving te same in the api url. Here only city and API key is required 
    //let latitude = 15.3333;
    //let longitude = 74.0833;
    //This is the fetch api call. Await makes the function pause the execution and wait for a resolved promise before it continues. The execution will not move forward until there is a response from the api 
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
    const data = await response.json(); //Converting all the data into json. The execution wil not move forward until the whole promise is converted itno json format.
    console.log(" Weather Data --> ", data);

    renderWeatherInfo(data);
  }

  catch (e) {
    //Error Handling. Try statement defines a code block to run (to try). Catch statement defines a code block to handle any error. Finally statement defines a code block to run regardless of the result. Throw statement defines a custom error.
    console.log(" Error found inside fetchWeatherCity Method. ", e)
  }
}

async function fetchWeatherCoords() {

  try {
    let latitude = 15.3333;
    let longitude = 74.0833;

    let result = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`)
    let data = await result.json();
    console.log(" Weather Data --> ", data);

    renderWeatherInfo(data);
  }

  catch (e) {
    console.log(" Error found inside fetchWetherCoords Method. ", e);
  }
}
//Both UIs are there but they are not visible because opacity and scale are both 0. There are 2 buttons where at apoint of time opacity is 1 for any one of them. We can manipulate this by classList.
function switchTab(clickedTab) {

  apiErrorContainer.classList.remove("active");

  if (clickedTab !== currentTab) {
    currentTab.classList.remove("current-tab");
    currentTab = clickedTab;
    currentTab.classList.add("current-tab");
  }

  if (!searchForm.classList.contains("active")) {
    userInfoContainer.classList.remove("active");
    grantAccessContainer.classList.remove("active");
    searchForm.classList.add("active");
  }

  else {
    searchForm.classList.remove("active");
    userInfoContainer.classList.remove("active");
    getFromSessionStorage();
  }

}











// NEW CODE:
// // For switching from one tab to another i.e from Your Weather to Search Weather. Active class will be used to implement this functionality
// //Fetch the tabs forst
// const userTab = document.querySelector("[data-userWeather]");
// const searchTab = document.querySelector("[data-searchWeather]");
// const userContainer = document.querySelector(".weatherContainer");
// const grantAccessContainer = document.querySelector(".grantLocationContainer");
// const searchForm = document.querySelector("[data-searchForm]");
// const loadingScreen = document.querySelector(".loadingContainer");
// const userInfoContainer = document.querySelector(".userInfoContainer");

// //By default the currentTab will be the userTab i.e Your Weather. The Backgroud color and border radius is added.
// let currentTab = userTab;
// const API_KEY = "8f9340f2bef36bfa3e69bae871352fa6";
// console.log(API_KEY);
// currentTab.classList.add("current-tab");
// getFromSessionStorage();

// function switchTab(clickedTab) {

// // apiErrorContainer.classList.remove("active");
// //Shifting the grey bg colour of Your Weather Tab and Current Weather Tab on click
//     if(clickedTab !== currentTab) {
//         currentTab.classList.remove("current-tab"); //removing the grey bg css class from current tab 
//         currentTab = clickedTab;
//         currentTab.classList.add("current-tab");
//     }
// //If you want to switch tabs then you will have to remove active class from the one in which active class already exists. Adding active class to search Weather Form 
//     if(!searchForm.classList.contains("active")) {
//         userInfoContainer.classList.remove("active");
//         grantAccessContainer.classList.remove("active");
//         searchForm.classList.add("active");
//     }
// //If the current tab is Search weather tab then remove active class from search weather tab and add it to your weather tab
//     else {
//         searchForm.classList.remove("active");
//         userInfoContainer.classList.remove("active");
//         getFromSessionStorage(); //Cheking local storage for coordinates if its already saved for user's weather.
//     }
// }

// userTab.addEventListener("click", () => {
//     switchTab(userTab);
// });

// searchTab.addEventListener("click", () => {
//     switchTab(searchTab);
// });

// //This function checks if coordinates are already stored in local storage
// function getFromSessionStorage(){
//     const localCoordinates = sessionStorage.getItem("user-coordinates");
//     if(!localCoordinates){
//         console.log("Coordinates are not saved hence show grant locatoion access container");
//         grantAccessContainer.classList.add("active");
//     }
//     else{
//         console.log("local cordinates ae there in the local storage so use them to do api call");
//         const coordinates = JSON.parse(localCoordinates);
//         fetchUserWeatherInfo(coordinates);
//     }
// }

// async function fetchUserWeatherInfo(coordinates){
//     const {lat, lon} = coordinates;
//     //Remove the grant location access container to show the loading screen. Loading screen will show until the response  
//     grantAccessContainer.classList.remove("active");
//     loadingScreen.classList.add("active");
//     //API Call
//     try{
//         //let city = "delhi";
//         //Use latitude and longitude only if you are giving te same in the api url. Here only city and API key is required 
//         //let latitude = 15.3333;
//         //let longitude = 74.0833;
//         //This is the fetch api call. Await makes the function pause the execution and wait for a resolved promise before it continues. The execution will not move forward until there is a response from the api 
//         const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)
//         const data = await response.json(); //Converting all the data into json. The execution wil not move forward until the whole promise is converted itno json format.
//         loadingScreen.classList.remove("active");
//         userInfoContainer.classList.add("active");
//         console.log(" Weather Data --> " , data);
//         renderWeatherInfo(data); 
//         }
//     catch(e) {
//         //Error Handling. Try statement defines a code block to run (to try). Catch statement defines a code block to handle any error. Finally statement defines a code block to run regardless of the result. Throw statement defines a custom error.
//         console.log(" Error found inside fetchWeatherCity Method. ", e);
//         loadingScreen.classList.remove("active");
//         } 
// }

// function renderWeatherInfo(weatherInfo) {
//     const cityName = document.querySelector("[data-cityName]");
//     const countryIcon = document.querySelector("[data-countryIcon]");
//     const desc = document.querySelector("[data-weatherDesc]");
//     const weatherIcon = document.querySelector("[data-weatherIcon]");
//     const temp = document.querySelector("[data-temp]");
//     const windspeed = document.querySelector("[data-windspeed]");
//     const humidity = document.querySelector("[data-humidity]");
//     const cloud = document.querySelector("[data-cloud]");

//     cityName.innerText = weatherInfo?.name;
//     countryIcon.src = `https://flagcdn.com/144x108/${weatherInfo?.sys?.country.toLowerCase()}.png`;
//     desc.innerText = weatherInfo?.weather?.[0]?.description;
//     weatherIcon.src = `http://openweathermap.org/img/w/${weatherInfo?.weather?.[0]?.icon}.png`;
//     temp.innerText = weatherInfo?.main?.temp;
//     windspeed.innerText = weatherInfo?.wind?.speed;
//     humidity.innerText = weatherInfo?.main?.humidity;
//     cloud.innerText = weatherInfo?.clouds?.all;

//     // To show this in the UI. Created a new para.
//     // let newPara = document.createElement('p');
//     // newPara.textContent = `${(data?.main?.temp.toFixed(2))} °C`;
//     // document.body.appendChild(newPara);
// }

// function getLocation(){
//     if(navigator.geolocation){
//         navigator.geolocation.getCurrentPosition(showPosition);
//     }
//     else{
//         console.log("ALERT: No Geo Location Support Available");
//         alert("ALERT: No Geo Location Support Available");
//     }
// }

// function showPosition(position){
//     const userCoordinates = {
//         lat: position.coords.latitude,
//         lon: position.coords.longitude,
//     }
//     sessionStorage.setItem("user-coordinates", JSON.stringify(userCoordinates));
//     fetchUserWeatherInfo(userCoordinates);
// }

// const grantAccessButton = document.querySelector("[data-grantAccess]");
// grantAccessButton.addEventListener("click", getLocation);


// constsearchInput = document.querySelector("[data-searchInput]");
// searchForm.addEventListener("submit", (e) =>{
//     e.preventDefault();
//     let cityName = searchInput.value;
//     if(searchInput.value ==="") return;
//     else
//     fetchSearchWeatherInfo(searchInput.value);
// });

// async function fetchSearchWeatherInfo(city){
//     loadingScreen.classList.add("active");
//     userInfoContainer.classList.remove("active");
//     grantAccessContainer.classList.remove("active");
//     try{
//         const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)
//         const data = await response.json(); //Converting all the data into json. The execution wil not move forward until the whole promise is converted itno json format.
//         loadingScreen.classList.remove("active");
//         userInfoContainer.classList.add("active");
//         console.log(" Weather Data --> " , data);
//         renderWeatherInfo(data); 
//     }
//     catch(e){
//         console.log("Error found");
//     }

// }
