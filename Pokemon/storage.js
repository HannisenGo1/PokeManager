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
  try {
    const fetchPromises = pokemonList.map(async (pokemon) => {
      const response = await fetch(pokemon.url);
      const pokemonData = await response.json();

      if (pokemonData.sprites && pokemonData.sprites.front_default) {
        pokemonData.SpritesUrl = pokemonData.sprites.front_default;
        displayPokemon([pokemonData]);
      } else {
        console.error(`No image for ${pokemon.name}`);
      }

      return pokemonData;
    });

    const pokemonDataArray = await Promise.all(fetchPromises);
    return pokemonDataArray;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
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

      // Assuming addpokemonToTeam accepts an array of Pokémon data
      addpokemonToTeam(fetchedPokemonData);
    }
  });
}

 function displayTeam() {
    const myTeamDiv = document.querySelector('.my-team');
    myTeamDiv.innerHTML = ''; // Rensa innehållet för att uppdatera

    // Loopa genom alla medlemmar i teamet
    team.membersPokemon.forEach((pokemonData, index) => {
        const pokemonDiv = document.createElement('div');
        pokemonDiv.classList.add('pokemon-enter');

        // Skapa och lägg till nya element i "MY TEAM" -diven
        const h2 = document.createElement('h2');
        h2.textContent = `Namn på pokemon ${pokemonData.nickname || pokemonData.name}`;
        pokemonDiv.appendChild(h2);

        const imageDiv = document.createElement('div');
        imageDiv.classList.add('image');
        // Skapa och lägg till bild här (använd pokemonData.imageUrl)
        const img = document.createElement('img');
        img.src = pokemonData.imageUrl;
        imageDiv.appendChild(img);
        pokemonDiv.appendChild(imageDiv);

        const kickButton = document.createElement('button');
        kickButton.classList.add('kickHere');
        kickButton.textContent = 'Kick from team';
        // Lägg till händelselyssnare för att sparka Pokémon från teamet
        kickButton.addEventListener('click', () => handleKickFromTeam(index)); // Använd index för att identifiera pokémonen
        pokemonDiv.appendChild(kickButton);

        const toReservButton = document.createElement('button');
        toReservButton.classList.add('toreserv');
        toReservButton.textContent = 'Send to reserv';
        // Lägg till händelselyssnare för att skicka Pokémon till reserv
        toReservButton.addEventListener('click', () => handleSendToReserv(index)); // Använd index för att identifiera pokémonen
        pokemonDiv.appendChild(toReservButton);

        const smeknamnDiv = document.createElement('div');
        smeknamnDiv.classList.add('smeknamn');

        const label = document.createElement('label');
        label.textContent = 'Change name';
        smeknamnDiv.appendChild(label);

        const inputNickname = document.createElement('input');
        inputNickname.type = 'text';
        inputNickname.placeholder = 'Change nickname';
        inputNickname.value = pokemonData.nickname || ''; // Använd nuvarande smeknamn eller en tom sträng
        smeknamnDiv.appendChild(inputNickname);

        const confirmButton = document.createElement('button');
        confirmButton.classList.add('confirm');
        confirmButton.textContent = 'Confirm nickname';
        // Lägg till händelselyssnare för att bekräfta smeknamnändring
        confirmButton.addEventListener('click', () => handleConfirmNickname(index)); // Använd index för att identifiera pokémonen
        smeknamnDiv.appendChild(confirmButton);

        pokemonDiv.appendChild(smeknamnDiv);

        // Lägg till den nya Pokémon i "MY TEAM" -diven
        myTeamDiv.appendChild(pokemonDiv);
    });
}


// DISPLAY POKEMON:: 
//pokemon-bilderna och förmågorna

async function displayPokemon(pokemonList) {
  const searchForPokemonDiv = document.querySelector('.searchForPokemonDiv');

  for (const pokemonData of pokemonList) {
    const abilities = pokemonData.abilities || [];
    const championPokemonDiv = document.createElement('div');
    championPokemonDiv.classList.add('pokemon-enter');

	const addButton = document.createElement('button');
    addButton.classList.add('add-champion-button');
    addButton.textContent = 'Add to Team';
    addButtonList.push(addButton);
	addButton.addEventListener('click', function() {
      const index = addButtonList.indexOf(addButton);
      const selectedPokemon = pokemonList[index];
      addChampionToTeam(selectedPokemon);
    });

    // Lägg till unik identifierare
    const uniqueId = pokemonData.name.toLowerCase();
    championPokemonDiv.setAttribute('id', uniqueId);

    // Bildelement
    const imageUrl = pokemonData.SpritesUrl;
    const img = document.createElement('img');
    img.src = imageUrl;
    img.alt = pokemonData.name;
    championPokemonDiv.appendChild(img);

    const rubrikPokemon = document.createElement('h2');
    rubrikPokemon.textContent = `Name: ${pokemonData.name}`;
    championPokemonDiv.appendChild(rubrikPokemon);

    // Visa abilities på pokemonen
    const pokemonTypes = document.createElement('p');
    pokemonTypes.textContent = `Abilities: ${abilities.map((ability) => ability.ability.name).join(', ')}`;
    championPokemonDiv.appendChild(pokemonTypes);

    // Lägg till championdiv i sökdiven
    searchForPokemonDiv.appendChild(championPokemonDiv);

    // Knapp för att lägga till pokemonen
    const addPokemonsButton = document.createElement('button');
    addPokemonsButton.classList.add('addPokemonsbutton');
    addPokemonsButton.textContent = 'Add champions to team';

    // Lägg till en unik klass för varje knapp baserat på Pokemonens namn
    addPokemonsButton.classList.add(`add-button-${uniqueId}`);

    championPokemonDiv.appendChild(addPokemonsButton);

    const nicknameInput = document.createElement('input');
    nicknameInput.type = 'text';
    nicknameInput.placeholder = 'choose a nickname';
    championPokemonDiv.appendChild(nicknameInput);

    addButtonList.push(addPokemonsButton);
  }

  return addButtonList;
}



export { fetchPokemonData, displayPokemon, normalizeName, displayTeam};