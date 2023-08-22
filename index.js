let cards = []
let sum = 0
let hasBlackJack = false
let isAlive = false
let message = ""
let popupmsg = ""
let messageEl = document.getElementById("message-el")
let sumEl = document.getElementById("sum-el")
let cardsEl = document.getElementById("cards-el")
let popup = document.getElementById("pop-up")
let popupm = document.getElementById("popup-msg")
let audio = new Audio();
audio.src = "soundEffects.mp3";

let lose = new Audio();
lose.src = "Losing.mp3"

let gameOver = new Audio();
gameOver.src = "gameover.mp3"

let player = {
    n : "Player",
    chips: 200
}
 
let playerId = document.getElementById("player-el");

playerId.textContent = player.n + ": " + player.chips + "$"

function getRandomCard() {
    let randomNumer = Math.floor( Math.random()*13 ) + 1
    if (randomNumer > 10) {
        return 10
    } else if (randomNumer === 1) {
        return 11
    } else {
        return randomNumer
    }
}

function hidepopup()
{
    popup.style.display = 'none';
}

function playAudio()
{

}
function startGame() {
    if(player.chips < 50)
    {
        popupmsg = "Game Over. Please Refresh the page!";
        popupm.textContent = popupmsg;
        gameOver.play()
        popup.style.display = 'block';
        isAlive = false;
    }
    else
    {
        isAlive = true
        hasBlackJack = false
        let firstCard = getRandomCard()
        let secondCard = getRandomCard()
        cards = [firstCard, secondCard]
        sum = firstCard + secondCard
        player.chips-=50
        playerId.textContent = player.n + ": " + player.chips + "$"
        renderGame()
    }
    
}

function renderGame() {
    cardsEl.textContent = "Cards: "
    for (let i = 0; i < cards.length; i++) {
        cardsEl.textContent += cards[i] + " "
    }
    
    sumEl.textContent = "Sum: " + sum
    if (sum <= 20) {
        message = "Do you want to draw a new card?"
    } else if (sum === 21) {
        message = "You've got Blackjack!"
        audio.play();

        popupmsg = "You've got Blackjack!";
        popupm.textContent = popupmsg;
        popup.style.display = 'block';
        
        if(player.chips == 0) player.chips = 50;
        else player.chips += player.chips;
        playerId.textContent = player.n + ": " + player.chips + "$"
        hasBlackJack = true
    } else {
        lose.play();
        message = "You're out of the game!"
        isAlive = false
    }
    messageEl.textContent = message
}


function newCard() {
    // Only allow the player to get a new card if she IS alive and does NOT have Blackjack
    if(isAlive && !hasBlackJack){
        let card = getRandomCard()
        sum += card
        cards.push(card)
        renderGame()
    }

}
