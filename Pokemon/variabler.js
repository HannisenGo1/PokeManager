
const serchMeny = document.querySelector('.sök-container');
const findChampionButton = document.querySelector('.championbutton'); //knappen för find champion
const divFindChampionButton= document.querySelector('.findChampionstart');//bilden för find champion knapp 
const myTeamButton = document.querySelector('.team-button')
//knappen för my Team
const divMyTeamButton = document.querySelector('.MyTeamstart');
const menyChampion =document.querySelector('.championMenyn')// menyn för champions
const myTeam = document.querySelector('.my-team'); // meny för mitt team 
const backmeny = document.querySelector('.backMenyn');
const backButton = document.querySelector('.back-button');
const divSearchForPokemon = document.querySelector('.searchForPokemonDiv')
const headercolor= document.querySelector('.header');
const headerblue = document.querySelector('.header-blue');


myTeam.classList.add('hidden');
menyChampion.classList.add('hidden'); //menyn champion hidden
backmeny.classList.add('hidden');
serchMeny.classList.add('hidden');


findChampionButton.addEventListener('click', async () => {
	serchMeny.classList.remove('hidden');
	divFindChampionButton.classList.add('hidden');
	divMyTeamButton.classList.add('hidden');
	findChampionButton.classList.add('hidden');
	menyChampion.classList.remove('hidden');
	myTeam.classList.add('hidden')
	backmeny.classList.remove('hidden');
});

myTeamButton.addEventListener('click', async () => {

	menyChampion.classList.add('hidden');
	divMyTeamButton.classList.add('hidden')
	myTeam.classList.remove('hidden');
	backButton.classList.remove('hidden');
	divFindChampionButton.classList.add('hidden');
	backmeny.classList.remove('hidden');
	findChampionButton.classList.add('hidden')
	headercolor.classList.add('hidden');
	headerblue.classList.remove('hidden');
	
});

backButton.addEventListener('click', async () => { 
	divFindChampionButton.classList.remove('hidden');
	divMyTeamButton.classList.remove('hidden');
	backmeny.classList.add('hidden');
	findChampionButton.classList.remove('hidden');
	menyChampion.classList.add('hidden');
	myTeam.classList.add('hidden');
	divFindChampionButton.classList.add('visible');
	serchMeny.classList.add('hidden');
	divSearchForPokemon.classList.add('hidden');
headercolor.classList.remove('hidden');
headerblue.classList.remove('visible');
headerblue.classList.add('hidden');
 });

 serchMeny.addEventListener('click', async () => {

 })



