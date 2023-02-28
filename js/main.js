import { MY_API_KEY } from './config.js';
import {currencyEl_one} from './config.js';
import {currencyEl_two} from './config.js';
import {amountEl_one} from './config.js';
import {amountEl_two} from './config.js';
import {rateEl} from './config.js';
import {swap} from './config.js';


(function onLoad()
{
    // set a function for each button
    setButtonFunctions();

    // fetch from each API when the page loads
    getJoke();
    // getCurrencyExchangeRates();
    
})();

function setButtonFunctions()
{
    document.getElementById('buttonGetJoke').onclick = getJoke;
    // document.getElementById('buttonCurrency').onclick = getCurrencyExchangeRates;
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
    .catch(err => {
        console.log(err);
    });
}

// Currency Exchange rates
// async function getCurrencyExchangeRates()
// {
//     const from = document.getElementById('inputCurrencyFrom').value;
//     const to = document.getElementById('inputCurrencyTo').value;
//     await fetch("https://currency-exchange.p.rapidapi.com/exchange?q=1.0&from=" + from + "&to=" + to, {
//         "method": "GET",
//         "headers": {
//             "x-rapidapi-host": "currency-exchange.p.rapidapi.com",
//             "x-rapidapi-key": MY_API_KEY,
//         }
//     })
//     .then(response => response.json())
//     .then(response => {
//         console.log("Currency Exchange API object:");
//         console.log(response);
//         console.log("\n");

//         // display data
//         document.getElementById('currencyResult').innerHTML = 'Result: ' + response;
//     })
//     .catch(err => {
//         console.log(err);
//     });
// }

// Xcurrency 

function calculate() {
    const currency_one = currencyEl_one.value;
    const currency_two = currencyEl_two.value;
  
    fetch(`https://v6.exchangerate-api.com/v6/cd41f482039f5c09441ae9f9/latest/${currency_one}`)
      .then((res) => res.json())
      .then((data) => {
        //   console.log(data);
        const rate = data.conversion_rates[currency_two];
        rateEl.innerText = `1 ${currency_one} = ${rate} ${currency_two}`;
  
        amountEl_two.value = (amountEl_one.value * rate).toFixed(2);
      });
  }
  
  // Event Listeners
  currencyEl_one.addEventListener('change', calculate);
  amountEl_one.addEventListener('input', calculate);
  currencyEl_two.addEventListener('change', calculate);
  amountEl_two.addEventListener('input', calculate);
  swap.addEventListener('click', () => {
    const temp = currencyEl_one.value;
    currencyEl_one.value = currencyEl_two.value;
    currencyEl_two.value = temp;
    calculate();
  });
  
  calculate();



