/*
 * Create a list that holds all of your cards
 */
let moves = 0;
let score = 0;
const deckOfCards = Array.from(document.querySelectorAll('.card'));
const deck = document.querySelector('.deck');
let isClockOff = true;
let time= 0;
let clockId;

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

function shuffleTheDeck(){
    const shuffledCards = shuffle(deckOfCards);

    console.log(shuffledCards);

    for(card of shuffledCards){
        deck.appendChild(card);
    }
}
 


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call 
 * from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another
 *  function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call 
 * from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function 
 * that you call from this one)
 */

 var listOpenCards=[];

function init(){
    shuffleTheDeck();
    var deck = document.querySelector('.deck');
    deck.addEventListener('click', event => {
        const cardClicked = event.target;

        if(cardClicked.classList.contains('card')){
            if(isClockOff){
                startTheClock();
                isClockOff = false;
            }
        }
        if(cardClicked.classList.contains('card')
        && !cardClicked.classList.contains('match')
         && listOpenCards.length<2 
         && !listOpenCards.includes(cardClicked)){
            displayCardSymbol(cardClicked);
            openCards(cardClicked);
            if(listOpenCards.length === 2){
                check(cardClicked);
                incrementMove();
                checkScore();
            }
        }
    });
}

function startTheClock(){
    clockId = setInterval(() => {
        time++;
        showTime();

        console.log(time);
    },1000)
}

function toggleModal(){
    const getModal = document.querySelector('.modal');
    getModal.classList.toggle('hide');
}


function stopClock(){

    clearInterval(clockId);
}
function showTime(){
    const clock = document.querySelector('.clock');

    const minutes = Math.floor(time/60);
    const seconds = time%60;

    if(seconds<10){
        clock.innerHTML = `${minutes}: 0${seconds}`

    }
    else {
        clock.innerHTML = `${minutes}:${seconds}`

    }
}

 var displayCardSymbol = function(cardClicked){
     
    cardClicked.classList.toggle('open');
    cardClicked.classList.toggle('show');
    
 }
function lockCards(fCard,sCard){
    
    fCard.classList.toggle('match');
    sCard.classList.toggle('match');
    console.log("match")
    listOpenCards = [];

}

function hideCards(firstCard,secondCard){

    displayCardSymbol(firstCard);
    displayCardSymbol(secondCard);
    listOpenCards=[];


}

function changeStars(){

     const listOfStars = Array.from(document.querySelectorAll('.stars li'));


    for(var i=listOfStars.length-1; i>=0;i--){

        console.log("list of star  element"+listOfStars[i])

        if( !listOfStars[i].firstElementChild.classList.contains('fa-star-o')){
            listOfStars[i].firstElementChild.classList.remove('fa-star');
            listOfStars[i].firstElementChild.classList.add('fa-star-o');
            break;

        }
    }
   
}

function incrementMove(){
    moves++;
    const moveUpdate = document.querySelector('.moves');
    moveUpdate.innerHTML = moves;

    
}

function checkScore(){
    if(moves ===2 || moves === 3){
        changeStars();
    }

}

 function check(card){

    var firstCard = listOpenCards[0];
    var secondCard = listOpenCards[1];

    if(firstCard.firstElementChild.className === secondCard.firstElementChild.className){
        lockCards(firstCard,secondCard);
        score++;
    }

    else {

        setTimeout(() => {
            console.log("Not a Match"); 
            hideCards(firstCard,secondCard);

        },1000)
    }

 }

 function openCards(card){
    let currentCard = card;
    listOpenCards.push(currentCard);
    console.log(listOpenCards);
}
    
init();