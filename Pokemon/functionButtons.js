import { getPokemon, fetchPokemonData, displayPokemon, normalizeName } from "./ajax.js";
import{displayTeam} from "./storage.js"


const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchbutton');
const searchForPokemonDiv = document.querySelector('.searchForPokemonDiv');
const addPokemonButton = document.querySelector('.addPokemonsbutton');
const pokemonInfoDiv = document.getElementById('pokemonInfo');
const kickFromTeamBtn = document.querySelector('.kickHere');
const toReservBtn = document.querySelector('.toreserv');
let team = { membersPokemon: [], reservDiv: []};
let reservDiv = []
let countTeam= 0;
let countReserv = 0;
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
        console.log('Button clicked at index:', index);

        if (index !== -1) {
          const selectedPokemon = pokemonList[index];
          console.log('Selected Pokemon:', selectedPokemon);

          await fetchPokemonData([selectedPokemon]);
          console.log('Fetched Pokemon data for selected Pokemon.');

          addpokemonToTeam();
        }
      });
    }
    console.log('Initialization complete.');
  } catch (error) {
    console.error('Error during initialization:', error);
  }
});

async function handlesearch() {
  const name = normalizeName(searchInput.value);
  const allPokemon = await getPokemon();
  searchForPokemonDiv.classList.remove('hidden');

  try {
    const filterPokemon = allPokemon.filter((pokemon) => {
      const normalized = normalizeName(pokemon.name);
      return normalized.includes(name);
    });
    console.log('Filter result:', filterPokemon);

    if (filterPokemon.length > 0) {
      console.log('Filtered Pokemon:', filterPokemon);
      // Rensa tidigare resultat
      searchForPokemonDiv.innerHTML = '';
      // Hämta data för alla matchande Pokemon
      await fetchPokemonData(filterPokemon);
    } else {
      console.log('No matching Pokemon found');
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
    addInTeam(pokemonData);
  } else {
    console.error('Please enter a nickname.');
  }
}

function addInTeam(pokemon) {
  if (team.membersPokemon.length < maxTeam) {
    team.membersPokemon.push(pokemon);
  } else {
    team.reservDiv.push(pokemon);
  }
  displayTeam(team);
}

function handleConfirmNickname(index) {
  const newNickname = document.querySelector(`.pokemon-enter2[data-index="${index}"] .smeknamn input`).value;
  team.membersPokemon[index].nickname = newNickname;
  displayTeam(team);
}

function handleMoveToReserv(index, pokemonData) {
  const kickedPokemon = team.membersPokemon.splice(index, 1)[0];
  reservDiv.push(kickedPokemon);
  displayTeam({ membersPokemon, reservDiv});
  displayReserv(reservDiv)
  console.log(`moved ${kickedPokemon.nickname || kickedPokemon.name} to reserv.`)
}
let addButtonList = document.querySelectorAll('.add-champion-button');

searchForPokemonDiv.addEventListener('click', function (event) {
  if (event.target.classList.contains('addPokemonsbutton')) {
    const pokemonEnterDiv = event.target.closest('.pokemon-enter');
    addpokemonToTeam(pokemonEnterDiv);
  }
});

function isTeamComplete() {
  const existingTeamData = getExistingTeamData(); 
  return existingTeamData.length === 3;
}
function addPokemonToReservDom(pokemonData){
	const nuvarandeTeamDiv = document.getElementById('NuvarandeTeam');
	const pokemonDiv = document.createElement('div');
	pokemonDiv.classList.add('pokemon-enter2');
	const h2 = document.createElement('h2');
	h2.textContent = `name: ${pokemonData.nickname || pokemonData.name}`
	pokemonDiv.appendChild(h2)
	nuvarandeTeamDiv.appendChild(pokemonDiv);
}



function movePokemonDown(list, pokemon){ //teamList / reservList skickas in från metoden som anropar denna
	const index = list.indexOf(pokemon);
	if(index < list.length -1){
		const temp = list[index];
		list[index] = list[index + 1];
		list[index + 1] = temp;
	}
}

function handleKickFromTeam(index, pokemonData) {
  const kickedPokemon = membersPokemon.splice(index, 1)[0];
  displayTeam({membersPokemon, reservDiv});
  console.log(`Kicked ${kickedPokemon.nickname || kickedPokemon.name} from the team.`);
}

export function displayReserv(reservDiv){
	const reservTeamDiv = document.createElement('div');
	pokemonInfoDiv.classList.add('pokemon-enter2')
	const h2 = document.createElement('h2');
	h2.textContent = `Name: ${pokemonData.nickname || pokemonData.name}`
	pokemonInfoDiv.appendChild(h2);

	reservTeamDiv.appendChild(pokemonDiv)
}



function removeFromLocalStorage(pokemonData){
	const pokemonLista = pokemonLista.filter(pokemon => pokemon.nickname != pokemonData.nickname)

	localStorage.setItem('pokemonlista', JSON.stringify(updatedList));
}

