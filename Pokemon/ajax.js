let img = document.createElement('img')
let abilities = [];




// För att returnera endast små bokstäver!
function normalizeName(name) {
  return name.toLowerCase();
}

// FÖR ATT FÅ UT ALLA BILDERNA PÅ SIDAN
 async function getPokemon() {
  try {
    const url = 'https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0';
    const response = await fetch(url);
    const data = await response.json();

    if (data.results && data.results.length > 0) {
      const pokemonLista = data.results.map((pokemon) => ({
        name: pokemon.name,
        url: pokemon.url
      }));
      return pokemonLista;
    } else {
      console.error('No results');
      return [];
    }

  } catch (error) {
    console.error('Error with fetching', error);
    throw error; 
  }
}

//let imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonData.id}.png`;

let attributes = []
// Till console.log:: 
const url = ('https://pokeapi.co/api/v2/')

//får ut bilderna
async function fetchPokemonData(pokemonList) {
  // Skapa en Promise-array för att vänta på alla fetch-anrop
  const fetchPromises = pokemonList.map(async (pokemon) => {
    try {
      const response = await fetch(pokemon.url);
      const pokemonData = await response.json();

      if (pokemonData.sprites && pokemonData.sprites.front_default) {
        let imageUrl = pokemonData.sprites.front_default;

        pokemonData.SpritesUrl = imageUrl;
        // Visa varje matchande Pokemon
        console.log('Pokemon data:', pokemonData);
        displayPokemon([pokemonData]);
      } else {
        console.error(`No image for ${pokemon.name}`);
      }
      console.log('finished processing', pokemon.name);

      return pokemonData; // Return the data from the map callback
    } catch (error) {
      console.error(`Error fetch data ${pokemon.name}:`, error);
    }
  });

  // Vänta på att alla fetch-anrop ska slutföras innan du fortsätter
  const pokemonDataArray = await Promise.all(fetchPromises);
  return pokemonDataArray;
}
const addButtonList = [];
for (const addButton of addButtonList) {
  addButton.addEventListener('click', async function () {
    const index = addButtonList.indexOf(addButton);
    console.log('Button clicked at index:', index);

    if (index !== -1) {
      const selectedPokemon = pokemonList[index];
      console.log('Selected Pokemon:', selectedPokemon);

      const fetchedPokemonData = await fetchPokemonData([selectedPokemon]);
      console.log('Fetched Pokemon data for selected Pokemon:', fetchedPokemonData);

    
      addpokemonToTeam(fetchedPokemonData);
    }
  });
}



// DISPLAY POKEMON:: 
//pokemon-bilderna och förmågorna

async function displayPokemon(pokemonList) {
  const searchForPokemonDiv = document.querySelector('.searchForPokemonDiv');
  const addButtonList = [];

  for (const pokemonData of pokemonList) {
    const abilities = pokemonData.abilities || [];
    const championPokemonDiv = document.createElement('div');
    championPokemonDiv.classList.add('pokemon-enter');

    const addButton = document.createElement('button');
    addButton.classList.add('add-champion-button');
    addButton.textContent = 'Add to Team';
    addButtonList.push(addButton);

    addButton.addEventListener('click', async function () {
      addChampionToTeam(pokemonData);
    });

    const uniqueId = pokemonData.name.toLowerCase();
    championPokemonDiv.setAttribute('id', uniqueId);

    const imageUrl = pokemonData.SpritesUrl;
    const img = document.createElement('img');
    img.src = imageUrl;
    img.alt = pokemonData.name;
    championPokemonDiv.appendChild(img);

    const rubrikPokemon = document.createElement('h2');
    rubrikPokemon.textContent = `Name: ${pokemonData.name}`;
    championPokemonDiv.appendChild(rubrikPokemon);

    const pokemonTypes = document.createElement('p');
    pokemonTypes.textContent = `Abilities: ${abilities.map((ability) => ability.ability.name).join(', ')}`;
    championPokemonDiv.appendChild(pokemonTypes);

    searchForPokemonDiv.appendChild(championPokemonDiv);

    const addPokemonsButton = document.createElement('button');
    addPokemonsButton.classList.add('addPokemonsbutton');
    addPokemonsButton.textContent = 'Add champions to team';
    championPokemonDiv.appendChild(addPokemonsButton);

    const nicknameInput = document.createElement('input');
    nicknameInput.type = 'text';
    nicknameInput.placeholder = 'choose a nickname';
    championPokemonDiv.appendChild(nicknameInput);
  }

  return addButtonList;
}
    addButtonList.forEach((addButton, index) => {
    addButton.addEventListener('click', async function () {
      const selectedPokemon = pokemonList[index];
      await fetchPokemonData([selectedPokemon]);
      addpokemonToTeam();
	
    });
  });



export { getPokemon,fetchPokemonData, displayPokemon, normalizeName};