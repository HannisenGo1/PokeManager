import {words} from './svenska-ord.js'

// Math.Random () för att slumpa fram ord från listan! 
// input fältet för :: inputName    //console.log för att skriva ut namnet i consolen
// Använd localStorage för att spara datan i webbläsaren.
// Listan ska vara sorterad så att de bästa omgångarna visas överst: i första hand stigande på antal gissningar, i andra hand fallande på datum och tid för omgången. Man ska kunna växla till att visa omgångarna sorterade i fallande ordning på datum och tid.
//  JSON methods, stringify och parse.
// Använd Date-funktionen för att spara tiden som en poäng sparas: let scoreTime = (new Date).getTime() 
// poängVyn visas när man klickar på  " highscoreButton "
// let scoreTime = (new Date).getTime() 
//lägg applåder när man klarat det
//lägg ljudeffekt när användaren gissar fel

// StartView   ALLA VARIABLER 
const lättButton = document.getElementById('buttonLätt');
const mediumButton = document.getElementById('buttonMedium');
const svårButton = document.getElementById('buttonSvår');
const nameInput = document.getElementById('input-Name');
const labelnameInput = document.getElementById('inputName').value;
const startForButtonDiv = document.querySelector('.startOchHigh');
const buttonStart = document.querySelector('#startButton');
const buttonHighscore = document.querySelector('#highscoreButton');
const labelName = document.querySelector('.divForName');
const buttonBack = document.querySelector('#backButton');
const buttonHighscore2 = document.querySelector('#highscoreButtonSmall');
const tangentbord = document.querySelector('.keyboard-container');
const tangent = document.querySelectorAll('.key');
const svårighetsgradText = document.querySelector('.svårighetsgradText');
const startMeny = document.querySelector('.startOchHigh')  //div m start o highscore
const svårighetsgradDiv = document.querySelector('.svårighetsgrad');
const highScoreWindow = document.querySelector('.highscorewindow')//highscore meny
const gameOver = document.querySelector('.gameover') //gameoverdiv
const gameOverWordWas = document.querySelector('.game-over-word-was')
const gameOverShowWord = document.querySelector('.show-word')
const gameOverMessage = document.querySelector('.game-over-message')
const försökIgenKnapp = document.querySelector('#tryagainButton'); //igen knapp
const gameoverButton = document.querySelector('.gameoverButton')//div för knapparna
const userNameField = document.querySelector('.user-name')
const submissionField = document.getElementById('line-form')

//div för lätt,m,svår
// Anteckning -- svårighetsgradDiv pekar just nu på själva diven som innehåller lätt, medium, svår-knapparna.
// Använder variabeln 'svårighetsgrad' för att lagra svårighetsgraden som spelet läser av.
let svårighetsgrad = ''
let chosenWord = ''
let incorrectGuess = 0
let correctGuess = 0
let totalGuess = 0
let userName = ''
let sparadNamn = ''
let gameState = 'start-view'
let guessArray = []
let wordArray = []
let Victory = null
const easywords = words.filter((word) => word.length > 14)
const mediumwords = words.filter((word) => word.length <= 14 && word.length > 11)
const hardwords = words.filter((word) => word.length == 10 || word.length == 11)


svårighetsgradDiv.classList.add('hidden'); //lätt medium svår är gömd, tills användaren trycker på spela här knappen! 
highScoreWindow.classList.add('hidden'); //highscore div
gameOver.classList.add('hidden');  //gameover view 
gameoverButton.classList.add('hidden'); //tillbaka,kör igen knapparna
startMeny.classList.add('visible');
tangentbord.classList.add('hidden')
// ViewGameover.classList.add('hidden'); //gameover menyn

function hideAll(){
	svårighetsgradDiv.classList.add('hidden')
	labelName.classList.add('hidden')
	startMeny.classList.add ('hidden');
	startMeny.classList.remove('visible')
	gameOver.classList.add('hidden');
	gameOver.classList.remove('visible')
	tangentbord.classList.add('hidden')
	submissionField.classList.add('hidden')
	highScoreWindow.classList.add('hidden');
}

buttonStart.addEventListener('click', () =>{
	if (labelnameInput.length <2 ) {
		document.querySelector('.error-message').style.display = 'block';
		return;
	}
	hideAll()
	sparaNamn()
	svårighetsgradDiv.classList.remove('hidden')
});

//fungerar när man trycker tillbaka i highscore menyn ! 
buttonBack.addEventListener('click', () => { 
	hideAll()
	startMeny.classList.remove('hidden')
})

function Highscore(){
	hideAll()
	highScoreWindow.classList.remove('hidden')
}

buttonHighscore.addEventListener('click', Highscore)
buttonHighscore2.addEventListener('click', Highscore)
	
	// fungerar när man trycker på kör igen knappen
	function körIgenKnappen() {
		hideAll()
		labelName.classList.remove('hidden')
		gameOver.classList.remove('visible');
		svårighetsgradDiv.classList.add('hidden');
		gameoverButton.classList.remove('visible');
		buttonHighscore.classList.remove('visible');
		startMeny.classList.add('visible');
	}
	försökIgenKnapp.addEventListener('click', körIgenKnappen)

	lättButton.addEventListener('click', () => {
		startGame()
		chosenWord = easywords[randomInt(easywords.length)]
		svårighetsgradDiv.classList.remove('visible');
		svårighetsgradDiv.classList.add('hidden');
		buttonBack.classList.add('visible');
		submissionField.classList.remove('hidden')
		gameplay()
	})
	
	mediumButton.addEventListener('click', () => {
		startGame()
		chosenWord = mediumwords[randomInt(mediumwords.length)]
		svårighetsgradDiv.classList.remove('visible');
		svårighetsgradDiv.classList.add('hidden');
		submissionField.classList.remove('hidden')
		gameplay()
		
	})
	
	svårButton.addEventListener('click', () => {
		startGame()
		chosenWord = hardwords[randomInt(hardwords.length)]
		svårighetsgradDiv.classList.remove('visible');
		svårighetsgradDiv.classList.add('hidden');
		submissionField.classList.remove('hidden')
		gameplay()
	})
	
	// Sparar 1 namn än sålänge,lokalt ! 
	
	function sparaNamn(){
		let userName = nameInput.value; //hämta värdet från input
		localStorage.setItem("namn", userName); // sparar värdet
		let sparadNamn = localStorage.getItem("namn");
		console.log(sparadNamn)
		let newName = document.createElement('p')
		newName.innerText = sparadNamn
		userNameField.appendChild(newName)
	}
	
	
	// nameInput.addEventListener("change", (event) => {
	// 	const namn = event.target.value; //hämta värdet från input
	//     localStorage.setItem("namn", namn); // sparar värdet
	// 	const sparadNamn = localStorage.getItem("namn");
	// 	if (sparadNamn) {
	// 		nameInput.value = sparadNamn; //om någon data finns sparat
	// 	}
	// });
	
	
	
	
	
	
	// Alfabetet i en lista: 
	const alfabetet = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","Å","Ä", "Ö"];
	
	// variabeln heter: words för hela listan med alla ord: const words
	
	
	const randomInt = max => Math.floor(Math.random() * max);
	
	
	//playView
	
	const scaffoldGubbe = document.querySelector('#scaffold')
	const legsGubbe = document.querySelector('#legs')
	const armsGubbe = document.querySelector('#arms')
	const bodyGubbe = document.querySelector('#body')
	const headGubbe = document.querySelector('#head')
	
	function startGame(){
		gameState = 'game-view'
		scaffoldGubbe.classList.add('invisible')
		legsGubbe.classList.add('invisible')
		armsGubbe.classList.add('invisible')
		bodyGubbe.classList.add('invisible')
		headGubbe.classList.add('invisible')
		tangentbord.classList.remove('hidden')
		correctGuess = 0
		incorrectGuess = 0
		totalGuess = 0
		guessArray = []
		//lägg in maxgissningar 
	}
	
	function checkIfVictory(guessArray, wordArray) {
		// guesses: lista med strängar, varje sträng är en bokstav
		// wordArray: lista med strängar, varje är en bokstav
		for( let i = 0; i < wordArray.length; i++ ) {
			let letter = wordArray[i]
			// Har vi gissat på den här bokstaven?
			if( guessArray.includes(letter) ) {
				// Bra, letter fanns. Kolla nästa
						Victory = true
				}
			else {
				// Aj då! Bokstaven har inte blivit gissat på!
				Victory = false
			}
		}
	}
	//Skapar dashes ('_ _ _'), och ersätter dashes med bokstäver
	//när man trycker på rätt tangent:
	
	function gameplay(){
		let displayedWord = chosenWord.replace(/./g, '<span class="dash">_</span>')
		submissionField.innerHTML = displayedWord
		window.addEventListener('keyup', e => {
			if (gameState != 'game-view'){
				return
			}
			wordArray = chosenWord.split("")
			console.log(wordArray)
			let dashes = document.getElementsByClassName('dash')
			if (wordArray.includes(e.key)){
				tangent.forEach(t => {
					if (t.innerText === (e.key).toUpperCase()) {
						t.classList.add('correct')
					}
				})
				wordArray.forEach((letter, index) => {
					if (letter.toUpperCase() === e.key.toUpperCase()) {
						dashes[index].innerText = letter.toUpperCase()
					}
				})
				correctGuess++
				guessArray.push(e.key)
				checkIfVictory(guessArray, wordArray)
				if (Victory === true){
					console.log('Du vann!')
					// localStorage.setItem(incorrectGuess)
					gameOverWordWas.innerText = `Ordet var:`
					gameOverShowWord.innerText = `${chosenWord}`
					gameOverMessage.innerText = `Grattis! Du hade bara ${incorrectGuess} fel.`
				}
			}
			else if (guessArray.includes(e.key)){
				e.preventDefault()
			}
			else{
				tangent.forEach(t => {
					if (t.innerText === (e.key).toUpperCase()) {
							t.classList.add('incorrect')
							}
						})
				incorrectGuess++
				guessArray.push(e.key)
				console.log(incorrectGuess)
				if (incorrectGuess === 1){
					scaffoldGubbe.classList.remove('invisible')
				}
				else if (incorrectGuess === 2){
					headGubbe.classList.remove('invisible')
				}
				else if (incorrectGuess === 3){
					bodyGubbe.classList.remove('invisible')
				}
				else if (incorrectGuess === 4){
					armsGubbe.classList.remove('invisible')
				}else{
					legsGubbe.classList.remove('invisible')
					gameOver.classList.add('visible'); //Gameover popup!!!
					gameoverButton.classList.add('visible')
					tangent.forEach(t => {
						t.classList.remove('correct')
						t.classList.remove('incorrect')
						gameOverWordWas.innerText = `Ordet var:`
						gameOverShowWord.innerText = `${chosenWord}`
						gameOverMessage.innerText = `Synd! Vill du försöka igen?`
					})
					gameState = 'game-over-view'
				}
			}
		})
	}
	
	
	//gameoverView 
	
	
	
	const highscore = document.querySelector('#high-score')
	
	//scorescreenView
	// Visar endast namnen med denna funktionen .
	//buttonHighscore.addEventListener('click', () => {
	//sparadNamn = localStorage.getItem("namn");
	//if (sparadNamn) {
	//	highscorediv.textContent = sparadNamn
	//} 
	//}); 
	//nameInput.addEventListener('input', event => { // input namn för highscore
	//	highscore.innerText = event.target.value
	//})
	// lägg till så att den visar både vunna & förlorade med antal gissningar , ordets längd, datum+tid för omgången
	