// letters 
let letters = "abcdefghijklmnopqrstuvwxyz";

// get Array from letters
let LettersArray = Array.from(letters);

// select letters container
let lettersContainer = document.querySelector(".letters");

// generate Letters 
LettersArray.forEach(letters => {
  // crear span 
  let span = document.createElement("span");
  // creat letter text
  let theLetter = document.createTextNode(letters);
  // append the letters to span 
  span.appendChild(theLetter);
  // add class on span
  span.classList = "letters-box"
  // append span to letters container 
  lettersContainer.appendChild(span)
});

// Object of words + categories 
const words = {
  programing: ["php", "javascript", "go", "scala", "fortran", "r", "mysql", "python"],
  movies: ["zombie", "parasite", "Breaking Bad", "Game of Thrones", "bad boys"],
  people: ["Albert einstein", "Hitchcock", "Alexander", "cleopatra", "mahatma ghandi"],
  countries: ["Syria", "Paletine", "Yemen", "Egypt", "Bahrain", "Qatar"]
};

// get random property
let allkeys = Object.keys(words);

let randomPropNumber = Math.floor(Math.random() * allkeys.length);
let randomPropName = allkeys[randomPropNumber];
let randomPropValue = words[randomPropName];

let randomeValueNum = Math.floor(Math.random() * randomPropValue.length);
let randimeValueName = randomPropValue[randomeValueNum];

// set category info
document.querySelector(".game-info .category span").innerHTML = randomPropName;

// selcet letters guess Elment
let lettersGuessContainer = document.querySelector(".letters-guess");

// convert chosen word to array 

let lettersAndSpace = Array.from(randimeValueName);
console.log(lettersAndSpace);

// creat spans depend on word 

lettersAndSpace.forEach(letters => {
  // Creat Empty Span 
  let emptySpan = document.createElement("span");

  // if letters is space 

  if (letters === " ") {
    emptySpan.className = 'with-space'
  }

  // append span to the letters guess container 
  lettersGuessContainer.appendChild(emptySpan);
});
// select Guess span 
let GuessSpan = document.querySelectorAll(".letters-guess span");

// set wrong attemps 
let WrongAttemps = 0;

// select the draw Element 
let theDraw = document.querySelector(".hangman-draw")


// Handel Clicking on Letters 
document.addEventListener("click", (e) => {
  // set the Chose status 
  let ChoseStatus = false;
  if (e.target.className === 'letters-box') {
    e.target.classList.add("clicked");
    // get clicked letters 
    let ClickedLetter = e.target.innerHTML.toLowerCase();
    // the chosen word 
    let theChosenWord = Array.from(randimeValueName.toLowerCase());
    // console.log(ClickedLetter) 
    theChosenWord.forEach((wordLetters, WordIndex) => {
      // if the clicked letters = one of the chosen word letter
      if (ClickedLetter == wordLetters) {
        // set status correct
        ChoseStatus = true;
        // Loop on all guess spans 
        GuessSpan.forEach((span, spanIndex) => {
          if (WordIndex === spanIndex) {
            span.innerHTML = wordLetters;
          }
        });
      }
    });

    // if the letter is not in the word
    if (!ChoseStatus) {
      WrongAttemps++;
      theDraw.classList.add(`wrong-${WrongAttemps}`);
      document.getElementById("fail").play();

      if (WrongAttemps === 8) {
        endGame();
        lettersContainer.classList.add("finished");
        buttonNewGame();
      }
    } else {
      document.getElementById("success").play();
      let allGuessed = Array.from(GuessSpan).every(span => span.innerHTML.trim() !== "");
      if (allGuessed) {
        winnerGame();
        buttonNewGame();
      }
    }
  }
});

// End Game Function
function endGame() {
  // Create Popup Div
  let div = document.createElement("div");
  // Create Text
  let divText = document.createTextNode(`Game Over, The Word Is ${randimeValueName}`);
  // Append Text To Div
  div.appendChild(divText);
  // Add Class On Div
  div.className = 'popup';
  // Append To The Body
  document.body.appendChild(div);
}

function winnerGame() {
  // Create Popup Div
  let div = document.createElement("div");
  // Create Text
  let divText = document.createTextNode("won the match , Great Job ");
  // Append Text To Div
  div.appendChild(divText);
  // Add Class On Div
  div.className = 'popup-winner';
  // Append To The Body
  document.body.appendChild(div);
}

function buttonNewGame() {
  let button = document.createElement("button");
  let buttontext = document.createTextNode("New Game");
  button.appendChild(buttontext);
  button.classList.add("button-new-game");
  document.body.appendChild(button);
  button.addEventListener("click", () => {
    location.reload();
  });
};