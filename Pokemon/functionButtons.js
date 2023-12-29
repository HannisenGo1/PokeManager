import { getPokemon, fetchPokemonData, displayPokemon, normalizeName } from "./ajax.js";
import{displayTeam, membersPokemon, ReservPokemons, addToTeam, displayReserve} from "./storage.js"


const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchbutton');
const searchForPokemonDiv = document.querySelector('.searchForPokemonDiv');
export const maxTeam = 3;

searchForPokemonDiv.classList.add('hidden');
const pokemonEnterDiv = document.querySelector('.pokemon-enter');

const nicknameInput = document.createElement('input');
nicknameInput.type = 'text';
nicknameInput.placeholder = 'choose a nickname';


searchButton.addEventListener('click', handlesearch);

searchInput.addEventListener('keydown', (event) => {
	if (event.key === 'Enter'){
		handlesearch();
	}
});
 // fetchar listan från början! 
document.addEventListener("DOMContentLoaded", async function () {
	try {
    console.log('Starting initialization...');
    
    const pokemonList = await getPokemon();
    console.log('Fetched Pokemon list:', pokemonList);

    const addButtonList = await displayPokemon(pokemonList);
    console.log('Displayed Pokemon:', addButtonList);

    for (const addButton of addButtonList) {
      addButton.addEventListener('click', async function () {
        const index = addButtonList.indexOf(addButton);
        if (index !== -1) {
          const selectedPokemon = pokemonList[index];
          await fetchPokemonData([selectedPokemon]);
          addpokemonToTeam();
        }
      });
    }
    console.log('Initialization complete.');
  } catch (error) {
    console.error('Error during initialization:', error);
  }
});
// hanterar sökfunktionen 
async function handlesearch() {
  const name = normalizeName(searchInput.value);
  const allPokemon = await getPokemon();
  searchForPokemonDiv.classList.remove('hidden');

  try {
    const filterPokemon = allPokemon.filter((pokemon) => {
      const normalized = normalizeName(pokemon.name);
      return normalized.includes(name);
    });

    if (filterPokemon.length > 0) {
      // Rensa tidigare resultat
      searchForPokemonDiv.innerHTML = '';
      // Hämta data för alla matchande Pokemon
      await fetchPokemonData(filterPokemon);
    } else {
      searchForPokemonDiv.innerHTML = '<p>No matching Pokemon found</p>';
    }
  } catch (error) {
    console.error('Error with filtering Pokemon', error);
  }
}

async function addpokemonToTeam(pokemonEnterDiv) {
  handleAddClick(pokemonEnterDiv);
}

function handleAddClick(event) {
  const pokemonEnterDiv = event.closest('.pokemon-enter');

  const pokemonData = {
    name: pokemonEnterDiv.querySelector('h2').textContent,
    imageUrl: pokemonEnterDiv.querySelector('img').src,
    abilities: pokemonEnterDiv.querySelector('p').textContent
  };

  const nicknameInput = pokemonEnterDiv.querySelector('input');
  const nickname = nicknameInput.value;

  if (nickname !== '') {
    pokemonData.nickname = nickname;
    addToTeam(pokemonData);
  } else {
    console.error('Please enter a nickname.');
  }
}

// kick functionen för att ta bort alla pokemon helt ifrån båda lagen
export function handleKickFromTeam(index, pokemonData) {
  const kickedPokemon = membersPokemon.splice(index, 1)[0];
 if (ReservPokemons != null && ReservPokemons.length >0) {
	const firstReservPokemon = ReservPokemons[0];
	membersPokemon.push(firstReservPokemon);
	ReservPokemons.splice(0,1)
	displayReserve();
 }


  displayTeam()
  try {

} catch (error) {
  console.error('Error:', error);
}
}
//let addButtonList = document.querySelectorAll('.add-champion-button');

searchForPokemonDiv.addEventListener('click', function (event) {
  if (event.target.classList.contains('addPokemonsbutton')) {
    const pokemonEnterDiv = event.target.closest('.pokemon-enter');
    addpokemonToTeam(pokemonEnterDiv);
  }
});