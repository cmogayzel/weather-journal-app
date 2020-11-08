/* Global Variables */

//const { SSL_OP_NO_SSLv2 } = require("constants");
//const { response } = require("express");

let webSite = 'https://api.openweathermap.org/data/2.5/weather?zip=';
let apiKey = '9a4b23ee1a12ffef7d38abce98c146dc';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();


document.getElementById('generate').addEventListener('click',performPost)

function performPost(e) {
    
    const postZipcode = document.getElementById('zip').value;
    const myFeelings = document.getElementById('feelings').value;

    console.log(newDate);

    getTemp(webSite,postZipcode, apiKey)
    .then(function (data){
        console.log("Chuck temperature: ", data.main.temp)
        postData('http://localhost:8080/addWeatherData', {temperature: data.main.temp, date: newDate, user_response:myFeelings} )
        //Update the website user interface
        .then(function(){
            refreshUI()
        })
    })
    
    
}

//Aysnc GET with website
const getTemp = async(webSite, code,apiKey)=>{
    const webRes = await fetch(webSite + code + ',US' + '&APPID=' + apiKey)
    console.log(webRes);
    try {
        const data = await webRes.json();
        console.log(data);
        
        return data;
    }
    catch(error) {
        console.log('error', error);
    }
}

//Async to POST
const postData = async (url = '', data = {}) => {
    const postRequest = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    try {
        
        const newData = await postRequest.json();
       
        return newData;
    }
    catch (error) {
        console.log('POST Error:', error);
    }
}
//refresh the User Interface with new data
const refreshUI = async () => {
    const req = await fetch('http://localhost:8080/all');
    try {
        const allData = await req.json();
       
        document.getElementById('date').innerHTML = allData.date;
        document.getElementById('temp').innerHTML = allData.temperature;
        document.getElementById('content').innerHTML = allData.user_response;
    }
    catch (error) {
        console.log('UI Update error:', error);
    }
}