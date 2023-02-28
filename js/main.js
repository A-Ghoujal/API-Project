import { MY_API_KEY } from './config.js';



(function onLoad()
{
    setButtonFunctions();
    getJoke();
})();

function setButtonFunctions()
{
    document.getElementById('buttonGetJoke').onclick = getJoke;
    
    };


// Chuck Norris jokes
async function getJoke()
{
    await fetch("https://matchilling-chuck-norris-jokes-v1.p.rapidapi.com/jokes/random", {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "matchilling-chuck-norris-jokes-v1.p.rapidapi.com",
            "x-rapidapi-key": MY_API_KEY,
            "accept": "application/json"
        }
    })
    .then(response => response.json())
    .then(response => {
        console.log("Chuck Norris API object:");
        console.log(response);

        // display data
        document.getElementById('joke').innerHTML = response.value;
        document.getElementsByClassName('jokeTitle')[0].href = response.url;
    })
    .catch(err => { console.log(err);
    });
}

// Xcurrency 

const select = document.querySelectorAll('select');
const input = document.querySelectorAll('input');
const API_URL = "https://v6.exchangerate-api.com/v6/cd41f482039f5c09441ae9f9/latest/USD";
let html = '';

async function currency (){
    const res = await fetch(API_URL);
    const data = await res.json();
    const arrKeys = Object.keys(data.conversion_rates);
    const rates = data.conversion_rates;
    arrKeys.map(item => {
        return html += `<option value="${item}">${item}</option>`;
    });

for(let i = 0; i < select.length; i++){
   select[i].innerHTML = html;
};

function convert (i, j) {
    input [i].value = input [j].value * rates[select[i].value] / rates [select[j].value];
}

input[0].addEventListener('keyup', () => convert(1,0));
  

input[1].addEventListener('keyup', () =>  convert(0,1));
  

select[0].addEventListener('change', () =>  convert(1,0));
  

select[1].addEventListener('change', () =>  convert(0,1));
   
};
currency();


