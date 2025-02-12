// const { error } = require('@actions/core');

/*------------------------------------------------------------------------------
Full description at: https://github.com/HackYourFuture/Assignments/blob/main/3-UsingAPIs/Week2/README.md#exercise-2-gotta-catch-em-all

Complete the four functions provided in the starter `index.js` file:

`fetchData`: In the `fetchData` function, make use of `fetch` and its Promise 
  syntax in order to get the data from the public API. Errors (HTTP or network 
  errors) should be logged to the console.

`fetchAndPopulatePokemons`: Use `fetchData()` to load the pokemon data from the 
  public API and populate the `<select>` element in the DOM.
  
`fetchImage`: Use `fetchData()` to fetch the selected image and update the 
  `<img>` element in the DOM.

`main`: The `main` function orchestrates the other functions. The `main` 
  function should be executed when the window has finished loading.

Use async/await and try/catch to handle promises.

Try and avoid using global variables. As much as possible, try and use function 
parameters and return values to pass data back and forth.
------------------------------------------------------------------------------*/
async function fetchData(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Fetch failed ${response.status}`);
  }
  const jsonData = await response.json();
  // return the results array only from the data
  return jsonData.results;
}
// function to create the elements button and the select menu

function fetchAndPopulatePokemons(pokemons) {
  //creating the button'get pokemon'
  const buttonElement = document.createElement('button');
  buttonElement.innerText = 'Get pokemon!';
  document.body.appendChild(buttonElement);
  // adding a class to the btn so it can be  styled in in css
  buttonElement.classList.add('btn');
  //creating the select menu
  const selectElement = document.createElement('select');
  document.body.appendChild(selectElement);
  // when the button is clicked it will create an option for every pokemon  and then it will append it to select menu
  buttonElement.addEventListener('click', () =>
    pokemons.forEach((pokemon) => {
      const option = document.createElement('option');
      option.innerText = pokemon.name;
      option.value = pokemon.url;
      selectElement.appendChild(option);
    })
  );
  //storing the selected value in a const and invoke the fetchImage function with this value as URL and the pokemon name as image alt
  selectElement.addEventListener('change', (e) => {
    const pokemonUrl = e.target.value;
    //  access the options array and getting the text of the selected index
    const pokemonAlt = e.target.options[e.target.selectedIndex].text;
    fetchImage(pokemonUrl, pokemonAlt);
  });
}
// function to fetch image data from the url and render it
async function fetchImage(pokemonUrl, pokemonAlt) {
  try {
    // check if there is a previous image if it there remove it
    const existingImage = document.querySelector('img');
    if (existingImage) {
      existingImage.remove();
    }
    //creating the image element

    const response = await fetch(pokemonUrl);
    const pokemonData = await response.json();
    const pokemonSrc = pokemonData.sprites.front_default;
    const pokemonImageElement = document.createElement('img');
    pokemonImageElement.src = pokemonSrc;
    pokemonImageElement.alt = pokemonAlt;
    document.body.appendChild(pokemonImageElement);
  } catch (error) {
    console.log(error);
  }
}
async function main() {
  try {
    const response = await fetchData(
      'https://pokeapi.co/api/v2/pokemon?limit=151'
    );
    fetchAndPopulatePokemons(response);
  } catch (error) {
    console.log(error);
  }
}
window.addEventListener('onload', main());
