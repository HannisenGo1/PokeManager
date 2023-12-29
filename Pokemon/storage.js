import {maxTeam, handleKickFromTeam} from "./functionButtons.js";
//import { displayPokemon} from "./ajax.js"
export let membersPokemon =[]
export let ReservPokemons= []

//lägger til i laget
export function addToTeam(pokemonData) {
	console.log('startar addtoteam function');
	if (membersPokemon.length < maxTeam) {
		console.log('maxteam:', maxTeam)
		membersPokemon.push(pokemonData)
	}else{
		ReservPokemons.push(pokemonData)
		displayReserve();
		
	}
	displayTeam();
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
//my-team div
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

document.addEventListener("DOMContentLoaded", async function () {
	displayTeam()
});

//Display för mitt lag & reserv
export function displayTeam() {
	const myTeamDiv = document.querySelector('.my-team');
	myTeamDiv.innerHTML = '';
	const teamStatusDiv = document.createElement('h2');
	teamStatusDiv.classList.add('Team-status')
	teamStatusDiv.textContent = `Team members: ${membersPokemon.length} | Reserve members: ${ReservPokemons.length}`;
	console.log('reservdivens längd',ReservPokemons.length)
	myTeamDiv.appendChild(teamStatusDiv)
	let pokemonParent = document.createElement('div');
	pokemonParent.classList.add('flex');
	
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
		pokemonParent.appendChild(pokemonDiv);
		myTeamDiv.appendChild(pokemonParent);
	}); 
	/* if (ReservPokemons && ReservPokemons.length > 0) {
		const firstReservPokemon = ReservPokemons.shift();
		membersPokemon.push(firstReservPokemon);
		console.log('första reservpokemon', firstReservPokemon);
		displayReserve();
	}   */
}
function CreateForReservDiv(pokemonData) {
	const championPokemonDiv = document.createElement('div');
	championPokemonDiv.classList.add('pokemon-enter2');
	
	const img = document.createElement('img');
	img.src = pokemonData.imageUrl;
	img.alt = pokemonData.name;
	championPokemonDiv.appendChild(img);
	
	const h2 = document.createElement('h2');
	h2.textContent = `Name: ${pokemonData.nickname || pokemonData.name}`;
	championPokemonDiv.appendChild(h2);
	
	return championPokemonDiv;
}

export function displayReserve() {	
	let reservDiv = document.getElementById('reserver');
	reservDiv.innerHTML = '';
	const h2 = document.createElement('h2');
	h2.textContent = 'Reserv Pokemons';
	reservDiv.appendChild(h2)
	
	ReservPokemons.forEach((pokemonData, index) => {
		console.log('Reserv Pokemon Data:', pokemonData);
		let reservPokemonDiv = CreateForReservDiv(pokemonData);
		console.log('Reserv Pokemon Div:', reservPokemonDiv);
		reservDiv.appendChild(reservPokemonDiv);
	});
} 
