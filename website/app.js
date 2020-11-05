/* Global Variables */

let webSite = 'https://api.openweathermap.org/data/2.5/weather?zip=';
let apiKey = '80b98a55988855b79cf0d500f4986108';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();


document.getElementById('generate').addEventListener('click',callApi);

function callApi(e) {
    const postZipCode = document.getElementById('zip').value;
    const myFeelings = document.getElementById('feelings').value;
    
    console.log(newDate);
    getLocalTemp(webSite,postZipCode,apiKey)
    .then(function (userData) {
        // add data to POST request
        postData('http://localhost:8080/WeatherData/', {temperature: data.main.temp, date: newDate,userData: myFeelings})
      }).then(function (newData) {
        // call updateUI to update browser content
        updateUI()
      })
    // reset form
    form.reset();
  }
  
  /* Function to GET Web API Data*/
  const getWeather = async (webSite, postZipCode, apiKey) => {
    // res equals to the result of fetch function
    const res = await fetch(webSite + postZipCode + apiKey);
    try {
      // userData equals to the result of fetch function
      const userData = await res.json();
      return userData;
    } catch (error) {
      console.log("error", error);
    }
  }
  
  /* Function to POST data */
  const postData = async (url = '', data = {}) => {
    const req = await fetch(url, {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json;charset=UTF-8"
      },
      body: JSON.stringify({
        date: data.date,
        temp: data.temp,
        content: data.content
      })
    })
  
    try {
      const newData = await req.json();
      return newData;
    }
    catch (error) {
      console.log(error);
    }
  };
  
  
  const updateUI = async () => {
    const request = await fetch('/all');
    try {
      const allData = await request.json()
      // show icons on the page
      icons.forEach(icon => icon.style.opacity = '1');
      // update new entry values
      document.getElementById('date').innerHTML = allData.date;
      document.getElementById('temp').innerHTML = allData.temp;
      document.getElementById('content').innerHTML = allData.content;
    }
    catch (error) {
      console.log("error", error);
    }
  };
  
