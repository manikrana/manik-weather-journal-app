//import { application } from "express";

/* Global Variables */
const baseURL = "http://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey = "&appid=a270da5c9f9bb946f2e13862181ee323";
//declare global variable zip
let zip = null;
let feeling = null;

document.getElementById("generate").addEventListener("click", performAction);

function performAction(e) {
  //initialize zip when user fills the field and submits
  zip = document.getElementById("zip").value;
  feeling = document.getElementById("feelings").value;
  const freshData = getWeatherInfo(baseURL, apiKey, zip).then(function (
    freshData
  ) {
    console.log("FreshData:", freshData);
    postWeatherData("/addWeatherInfo", {
      date: newDate,
      zip: zip,
      feeling: feeling,
      temp: freshData.main.temp,
    });
    updateUI();
  });
}

const getWeatherInfo = async (baseURL, apiKey, zip) => {
  const response = await fetch(baseURL + zip + apiKey);
  try {
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("error", error);
  }
};

//POST Route
const postWeatherData = async (url = "", data = {}) => {
  console.log("Inside POST:", data);
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  try {
    const newData = await response.json();
    console.log("newData: ", newData);
    return newData;
  } catch (error) {
    console.log("error", error);
  }
};

//Update UI
const updateUI = async () => {
  const request = await fetch("/getData");
  try {
    const serverData = await request.json();
    console.log("ServerData: ", serverData);
    document.getElementById("date").innerHTML = "Date: " + serverData.date;
    document.getElementById("zipcode").innerHTML = "ZIP: " + serverData.zip;
    document.getElementById("feeling").innerHTML =
      "Feeling: " + serverData.feeling;
    document.getElementById("temp").innerHTML =
      "Temperature: " + serverData.temp;
  } catch (error) {
    console.log("error", error);
  }
};

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();
