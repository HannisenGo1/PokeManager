import {maxTeam} from "./functionButtons.js";
import { displayPokemon} from "./ajax.js"
export let membersPokemon =[]
export let ReservPokemons= []


export function addToTeam(pokemonData) {
	console.log('startar addtoteam function');
    const pokemonInfoToSave = {
      name: pokemonData.name,
      imageUrl: pokemonData.SpritesUrl || '',
      nickname: pokemonData.nickname || ''
    };
	  if (membersPokemon.length < maxTeam) {
		console.log('maxteam:', maxTeam)
	membersPokemon.push(pokemonInfoToSave)
  }else{
	ReservPokemons.push(pokemonInfoToSave)
	displayReserve();
  }
 displayTeam({membersPokemon, ReservPokemons})
 console.log('reservlistan:' , ReservPokemons)
 console.log('slutet av addtoteam functionen');
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
	const reservDivDom = document.querySelector('.my-team #reserver');
	try {
    console.log('Starting initialization...');
    const storedTeamData = JSON.parse(localStorage.getItem('myteam')) || []; //myTeam
    membersPokemon = storedTeamData.slice(0, maxTeam);
    ReservPokemons = storedTeamData.slice(maxTeam);
	displayTeam({membersPokemon, ReservPokemons})

  } catch (error) {
    console.error('Error during initialization:', error);
  }
});

export function displayTeam() {
  const myTeamDiv = document.querySelector('.my-team');
  myTeamDiv.innerHTML = '';

  const teamStatusDiv = document.createElement('div');
  teamStatusDiv.classList.add('Team-status')
  teamStatusDiv.textContent = `Team members: ${membersPokemon.length} | Reserve members: ${ReservPokemons.length}`;
  console.log('reservdivens längd',ReservPokemons.length)
 myTeamDiv.appendChild(teamStatusDiv)


 membersPokemon.forEach((pokemonData, index) => {
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
    toReservButton.textContent = 'Move to reserv';
    pokemonDiv.appendChild(toReservButton)
    toReservButton.addEventListener('click', () => handleMoveToReserv(index)); 

	const addToTeamButton = document.createElement('button');
  addToTeamButton.classList.add('addToTeam');
  addToTeamButton.textContent = 'Add to Team';
  addToTeamButton.addEventListener('click', () => {
	if(membersPokemon.length < maxTeam) {
		addToTeam(pokemonData)
	}else{
		console.log('Team is completed')
	}
});
pokemonDiv.appendChild(addToTeamButton)


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
 if (ReservPokemons && ReservPokemons.length > 0) {
  const firstReservPokemon = ReservPokemons.shift();
  membersPokemon.push(firstReservPokemon);
  console.log('första reservpokemon', firstReservPokemon);
  displayReserve();
}
}

export function displayReserve() {
  console.log('kommer in i displayreserv');
  const reservDiv = document.getElementById('reserver');
  const myTeamElement = document.querySelector('.my-team');
  console.log('myTeamElement:', myTeamElement);

  console.log('ReservDiv:', reservDiv);
  if (reservDiv) {
    reservDiv.innerHTML = '';

    ReservPokemons.forEach((pokemonData, index) => {
      console.log('Reserv Pokemon Data:', pokemonData);
      const reservPokemonDiv = createPokemonDiv(pokemonData, index);
      console.log('Reserv Pokemon Div:', reservPokemonDiv);
      reservDiv.appendChild(reservPokemonDiv);
    });
  } else {
    console.error('Reserverdiv hittas ej i dom');
  }
}