/* Global Variables */

//const { SSL_OP_NO_SSLv2 } = require("constants");
//const { response } = require("express");

let webSite = 'https://api.openweathermap.org/data/2.5/weather?zip=';
let apiKey = '80b98a55988855b79cf0d500f4986108';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();


document.getElementById('generate').addEventListener('click',performPost)

function performPost(e) {
    console.log("Hello,Chuck");
    const postZipcode = document.getElementById('zip').value;
    const myFeelings = document.getElementById('feelings').value;
    console.log(newDate);
    
}

//Aysnc GET with website
const getTemp = async(webSite, code,apiKey)=>{
    const webRes = await fetch(baseURL + code + ',us' + '&APPID=' + key)
    console.log(webRes);
    try {
        const data = await response.json();
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
    const request = await fetch('http://localhost:8080/all');
    try {
        const allData = await request.json();
       // console.log('TRECIAS');
        document.getElementById('date').innerHTML = allData.date;
        document.getElementById('temp').innerHTML = allData.temperature;
        document.getElementById('content').innerHTML = allData.user_response;
    }
    catch (error) {
        console.log('UI Update error:', error);
    }
}