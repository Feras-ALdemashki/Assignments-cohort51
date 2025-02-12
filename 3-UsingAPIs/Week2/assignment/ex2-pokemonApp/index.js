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
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Fetch failed ${response.status}`);
    }
    const jsonData = await response.json();
    return jsonData.results;
  } catch (error) {
    console.error(error);
  }
}

function fetchAndPopulatePokemons() {
  const buttonElement = document.createElement('button');
  buttonElement.innerText = 'Get Pokémon!';
  document.body.appendChild(buttonElement);
  buttonElement.classList.add('btn');

  const selectElement = document.createElement('select');
  document.body.appendChild(selectElement);

  buttonElement.addEventListener('click', async () => {
    selectElement.innerHTML = '';
    try {
      const pokemons = await fetchData(
        'https://pokeapi.co/api/v2/pokemon?limit=151'
      );
      pokemons.forEach((pokemon) => {
        const option = document.createElement('option');
        option.innerText = pokemon.name;
        option.value = pokemon.url;
        selectElement.appendChild(option);
      });
    } catch (error) {
      console.error(error);
    }
  });

  selectElement.addEventListener('change', (e) => {
    const pokemonUrl = e.target.value;
    const pokemonAlt = e.target.options[e.target.selectedIndex].text;
    fetchImage(pokemonUrl, pokemonAlt);
  });
}

async function fetchImage(pokemonUrl, pokemonAlt) {
  try {
    const existingImage = document.querySelector('img');
    if (existingImage) {
      existingImage.remove();
    }
    const response = await fetch(pokemonUrl);
    const pokemonData = await response.json();
    const pokemonSrc = pokemonData.sprites.front_default;
    const pokemonImageElement = document.createElement('img');
    pokemonImageElement.src = pokemonSrc;
    pokemonImageElement.alt = pokemonAlt;
    document.body.appendChild(pokemonImageElement);
  } catch (error) {
    console.error(error);
  }
}

function main() {
  fetchAndPopulatePokemons();
}

window.addEventListener('load', main);
