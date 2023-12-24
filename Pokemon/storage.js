import {maxTeam} from "./functionButtons.js";
import { displayPokemon} from "./ajax.js"
let membersPokemon= [];

export function addToTeam(pokemonData) {
  if (membersPokemon.length < maxTeam) {
    const pokemonInfoToSave = {
      name: pokemonData.name,
      imageUrl: pokemonData.SpritesUrl || '',
      nickname: pokemonData.nickname || ''
    };

    membersPokemon.push(pokemonInfoToSave);
    saveToLocalStorage(pokemonInfoToSave);
    addPokemonToTeamDOM(pokemonInfoToSave); // Add this line
  } else {
    console.log('Laget är redan komplett.');
  }

  updateSelectedCount(); // Uppdatera antalet valda Pokémon
}
export function addPokemonToTeamDOM(pokemonData) {
  const myTeamDiv = document.querySelector('.my-team');
  const championPokemonDiv = createPokemonDiv(pokemonData);

  const nicknameInput = createNicknameInput();
  const confirmButton = createConfirmButton(pokemonData, nicknameInput);

  championPokemonDiv.appendChild(nicknameInput);
  championPokemonDiv.appendChild(confirmButton);
  myTeamDiv.appendChild(championPokemonDiv);
}
export function createPokemonDiv(pokemonData) {
  const championPokemonDiv = document.createElement('div');
  championPokemonDiv.classList.add('pokemon-enter2');

  const img = document.createElement('img');
  img.src = pokemonData.sprites?.front_default || '';
  img.alt = pokemonData.name;
  championPokemonDiv.appendChild(img);

  const h2 = document.createElement('h2');
  h2.textContent = `Name: ${pokemonData.name}`;
  championPokemonDiv.appendChild(h2);

  const abilitiesParagraph = document.createElement('p');
  const abilitiesText = pokemonData.abilities.map((ability) => ability.ability.name).join(', ');
  abilitiesParagraph.textContent = `Abilities: ${abilitiesText}`;
  championPokemonDiv.appendChild(abilitiesParagraph);

  return championPokemonDiv;
}
export function createNicknameInput() {
  const nicknameInput = document.createElement('input');
  nicknameInput.type = 'text';
  nicknameInput.placeholder = 'Choose a nickname';
  return nicknameInput;
}

export function createConfirmButton(pokemonData, nicknameInput) {
  const confirmButton = document.createElement('button');
  confirmButton.textContent = 'Confirm nickname';
  confirmButton.addEventListener('click', () => handleConfirmNickname(pokemonData, nicknameInput));
  return confirmButton;
}

export function saveToLocalStorage(pokemonData) {
  const existingTeamData = JSON.parse(localStorage.getItem('myTeam')) || [];
  
  const pokemonInfoToSave = {
    name: pokemonData.name,
    imageUrl: pokemonData.SpritesUrl || '',
    nickname: pokemonData.nickname || ''
  };

  existingTeamData.push(pokemonInfoToSave);
  localStorage.setItem('myTeam', JSON.stringify(existingTeamData));
  membersPokemon.push(pokemonInfoToSave);

  console.log('Saving to local storage:', pokemonInfoToSave);
}
document.addEventListener("DOMContentLoaded", async function () {
  try {
    console.log('Starting initialization...');
    const storedTeamData = JSON.parse(localStorage.getItem('myTeam')) || [];
    membersPokemon = storedTeamData.slice(0, maxTeam);
    reservDiv = storedTeamData.slice(maxTeam);

  } catch (error) {
    console.error('Error during initialization:', error);
  }
});

export function displayTeam(team) {
  const myTeamDiv = document.querySelector('.my-team');
  myTeamDiv.innerHTML = '';

  team.membersPokemon.forEach((pokemonData, index) => {
    const pokemonDiv = document.createElement('div');
	pokemonDiv.classList.add('pokemon-enter2');
	pokemonDiv.dataset.index = index;

    const h2 = document.createElement('h2');
    h2.textContent = `Name: ${pokemonData.nickname || pokemonData.name}`;
    pokemonDiv.appendChild(h2);

    const imageDiv = document.createElement('div');
    imageDiv.classList.add('image');

    const img = document.createElement('img');
    img.src = pokemonData.imageUrl;
    imageDiv.appendChild(img);
    pokemonDiv.appendChild(imageDiv);

    const kickButton = document.createElement('button');
    kickButton.classList.add('kickHere');
    kickButton.textContent = 'Kick from team';
    kickButton.addEventListener('click', () => handleKickFromTeam(index));
    pokemonDiv.appendChild(kickButton);
    
	const toReservButton = document.createElement('button');
    toReservButton.classList.add('toreserv');
    toReservButton.textContent = 'Send to reserv';
    toReservButton.addEventListener('click', () => handleSendToReserv(index));
    pokemonDiv.appendChild(toReservButton);

    const smeknamnDiv = document.createElement('div');
    smeknamnDiv.classList.add('smeknamn');

    const label = document.createElement('label');
    label.textContent = 'Change name';
    smeknamnDiv.appendChild(label);

    const inputNickname = document.createElement('input');
    inputNickname.type = 'text';
    inputNickname.placeholder = 'Change nickname';
    inputNickname.value = pokemonData.nickname || '';
    smeknamnDiv.appendChild(inputNickname);


	
    const confirmButton = document.createElement('button');
    confirmButton.classList.add('confirm');
    confirmButton.textContent = 'Confirm nickname';
    confirmButton.addEventListener('click', () => handleConfirmNickname(index));

    smeknamnDiv.appendChild(confirmButton);

    pokemonDiv.appendChild(smeknamnDiv);

    myTeamDiv.appendChild(pokemonDiv);

  });
}