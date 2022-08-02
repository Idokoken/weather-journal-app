//const full_url = `https://api.openweathermap.org/data/2.5/weather?zip={zip code},{country code}&appid={API key}`;
// const api_key = "&appid=eae4c7df9d0c80084e5da9ace7f1a8b9&units=emperial";
// const base_url = "https://api.openweathermap.org/data/2.5/weather?zip=";

//apikey and base url
const api_key = "&appid=eae4c7df9d0c80084e5da9ace7f1a8b9&units=metric";
const base_url = "https://api.openweathermap.org/data/2.5/weather?q=";

const generate = document.getElementById("generate");
//const initialFeelings = document.getElementById("feelings");
//const initialZip = document.getElementById("zip");

generate.addEventListener("click", performAction);

//function to  generate data
function performAction(e) {
  e.preventDefault();

  let feelings = document.getElementById("feelings").value;
  let zip = document.getElementById("zip").value;

  getData(base_url, zip, api_key)
    .then(function (data) {
      postData("/addData", {
        temp: data.main.temp,
        date: data.dt,
        feel: feelings,
        city: data.name,
        icon: data.weather[0].icon,
        country: data.sys.country,
      });
    })
    .then(retrieveData());
}

//get request
const getData = async (url = "", zipcode = "", key = "") => {
  const resp = await fetch(url + zipcode + key);
  try {
    const data = await resp.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

//post request
const postData = async (url = "", data = {}) => {
  const resp = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  try {
    const newData = await resp.json();
    return newData;
  } catch (error) {
    console.log(error);
  }
};

// updating the user interface
const retrieveData = async () => {
  const request = await fetch("/all");
  try {
    const allData = await request.json();

    console.log(allData);

    document.getElementById("temp").innerHTML =
      Math.round(allData.temp) + " degrees";
    document.getElementById("content").innerHTML = allData.feel;
    document.getElementById("date").innerHTML = new Date(
      allData.date * 1000
    ).toLocaleDateString();
    document.getElementById("city").innerHTML =
      allData.city + ", " + allData.country;
    document.getElementById("icon").src = allData.icon
      ? "http://openweathermap.org/img/w/" + allData.icon + ".png"
      : null;
  } catch (error) {
    console.log("error", error);
  }
};
