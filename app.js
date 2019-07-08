const qwerty = document.getElementById('qwerty');
const ul = document.querySelector('#phrase ul');
const mainDiv = document.querySelector('.main-container');
const letters = document.getElementsByClassName('letter');
const show = document.getElementsByClassName('show');
const btn = document.querySelector('.btn__reset');
const lives = document.querySelectorAll('img');
const buttons = qwerty.querySelectorAll('button');
let missed = 0;


// Open up Game
mainDiv.addEventListener('click', (e) => {
  if (e.target.tagName === 'A') {
    const button = e.target;
    const div = button.parentNode;
    div.style.display = 'none';
  }
  });


var phrases = ['Oscar Wilde', 'Roald Dahl', 'James Joyce', 'Emily Bronte', 'Sylvia Plath'];

// Get random phrase function

function getRandomPhrase(array) {
    var randomPhrase = array[Math.floor(Math.random() * array.length)];
    var gameWord = randomPhrase.split('');
    return gameWord;
  }

// console.log(getRandomPhrase(phrases));

const phraseArray = getRandomPhrase(phrases);

// Post random phrase to display

function addPhraseToDisplay(array) {
  for (var i = 0; i < array.length; i += 1) {
    let li = document.createElement('li');
    li.textContent = array[i];
    if(array[i] !== " ") {
     li.className = "letter";
   } else {
     li.className = "space";
   }
    ul.appendChild(li);
}
}

addPhraseToDisplay(phraseArray);

//Check if clicked letter matches

function checkLetter(clicked) {
  const guess = clicked.textContent;
  let correctLetter = null;
  for (let i = 0; i < letters.length; i += 1) {
    if (letters[i].textContent.toLowerCase() === guess) {
      letters[i].classList.add('show');
      correctLetter = letters[i].textContent;
   }
}
return correctLetter;
};

//Check Win Function

function checkWin() {
  const overlay = document.querySelector('#overlay');
  let header = document.querySelector('h2');
  if (show.length === letters.length) {
    overlay.classList.add('win');
    overlay.classList.remove('start');
    overlay.style.display = 'unset';
    header.textContent = 'Congratulations, you win!';
    header.style.marginBottom = '200px';
    btn.textContent = 'Play again'
  }
  else if (missed >= 5) {
    overlay.classList.add('lose');
    overlay.classList.remove('start');
    overlay.style.display = 'unset';
    header.textContent = 'You Lose!';
    header.style.marginBottom = '200px';
    btn.textContent = 'Try again'
  }
}

//Add Event Listener to Keyboard to listen for button clicked

qwerty.addEventListener('click', (event) => {
if (event.target.tagName === 'BUTTON') {
  event.target.classList.add('chosen');
  event.target.setAttribute('disabled', true)
  checkLetter(event.target);
}
else {
  return false;
}

// If wrong letter is selected

if (checkLetter(event.target) === null) {
  // let list = ol.lastElementChild;
  // ol.removeChild(list);

lives[missed].style.display = 'none';
missed += 1;
}
checkWin();
});

//FUNCTION TO RESET THE GAME

btn.addEventListener('click', () => {
    overlay.className = "start";
    missed = 0;
    ul.textContent = '';
    for (i = 0; i < buttons.length; i += 1) {
        buttons[i].removeAttribute('class');
        buttons[i].removeAttribute('disabled');
    }

    for (let i = 0; i < lives.length; i += 1) {
        lives[i].style.display = 'flex';
    }

    const phraseArray = getRandomPhrase(phrases);
    addPhraseToDisplay(phraseArray);
    overlay.style.display = "none";
});
