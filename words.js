var inquirer = require("inquirer");
var startGame = require("./letter.js");

// //This is the list on words that may be selected for the player to guess.
// var randomWords = ["cat", "save", "blink", "job", "words", "random", "supercalifragilisticexpialidocious", "shark", "london", "witch", "dog"];

// //This will hold the random word selected from the randomWords array.
// var chosenWord = "";

// // This will break the solution into individual letters to be stored in array.
// var lettersInChosenWord = [];

// // This will be the number of blanks we show based on the solution.
// var numBlanks = 0;

// // Holds a mix of blank and solved letters (ex: 'n, _ _, n, _').
// var blanksAndSuccesses = [];

// // Holds all of the wrong guesses.
// var wrongGuesses = [];

// // Holds the letters guessed
// var letterGuessed = "";

// // Game counters
// var winCounter = 0;
// var lossCounter = 0;
// var guessesLeft = 10;

// // startGame()
// // It's how we we will start and restart the game.
// // (Note: It's not being run here. Function declarations like this are made for future use.)
// function startGame() {

//     // Reset the guesses back to 0.
//     guessesLeft = 10;

//     // Solution chosen randomly from wordList.
//     chosenWord = randomWords[Math.floor(Math.random() * randomWords.length)];

//     // The word is broken into individual letters.
//     lettersInChosenWord = chosenWord.split("");

//     // We count the number of letters in the word.
//     numBlanks = lettersInChosenWord.length;

//     // We print the solution in console (for testing).
//     console.log(chosenWord);

//     // CRITICAL LINE
//     // Here we *reset* the guess and success array at each round.
//     blanksAndSuccesses = [];

//     // CRITICAL LINE
//     // Here we *reset* the wrong guesses from the previous round.
//     wrongGuesses = [];

//     // Fill up the blanksAndSuccesses list with appropriate number of blanks.
//     // This is based on number of letters in solution.
//     for (var i = 0; i < numBlanks; i++) {
//         blanksAndSuccesses.push("_");
//     }

//     // Print the initial blanks in console.
//     console.log(blanksAndSuccesses);

//     // Reprints the guessesLeft to 9.
//     console.log(guessesLeft);

//     // Prints the blanks at the beginning of each round in the HTML.
//     console.log(blanksAndSuccesses.join(" "));

//     // Clears the wrong guesses from the previous round.
//     console.log(wrongGuesses.join(" "));
// }
var gameInit = new startGame();

var Words = function () {
var that = this;
    this.checkLetters = function (letter) {

        // This boolean will be toggled based on whether or not
        // a user letter is found anywhere in the word.
        var letterInWord = false;

        // Check if a letter exists inside the array at all.
        for (var i = 0; i < gameInit.numBlanks; i++) {

            if (gameInit.chosenWord[i] === letter) {

                // If the letter exists then toggle this boolean to true.
                // This will be used in the next step.
                letterInWord = true;
            }
        }

        // If the letter exists somewhere in the word,
        // then figure out exactly where (which indices).
        if (letterInWord) {

            // Loop through the word
            for (var j = 0; j < gameInit.numBlanks; j++) {

                // Populate the blanksAndSuccesses with every instance of the letter.
                if (gameInit.chosenWord[j] === letter) {

                    // Here we set specific blank spaces to equal the correct letter
                    // when there is a match.
                    gameInit.blanksAndSuccesses[j] = letter;
                }
            }

            // Log the current blanks and successes for testing.
            console.log(gameInit.blanksAndSuccesses);
        }

        // If the letter doesn't exist at all...
        else {

            // Then we add the letter to the list of wrong letters.
            gameInit.wrongGuesses.push(letter);

            // We also subtract one of the guesses.
            gameInit.guessesLeft--;

        }

    }

    //Function to restart the game or end it based on the users input
    this.restart = function () {
        // function ask the user whether or not they'd like to play again?
        inquirer.prompt([{
            // Indicates the prompt will require a boolean response.
            type: "confirm",
            name: "playAgain",
            message: "Would you like to play again?",
            // if the user does not respond as prompted the game will just assume they responded yes.
            default: true
            // once the user has responsed the function below will perform a task based on the user's response.
        }]).then(function (reset) {
            // if the user responds they do want to play again or gives no response the game will restart with a new word.
            if (reset.playAgain === true) {
                gameInit.startGame();
                that.firstPrompt();
            } else {
                // if the user responds no they will just return to their terminal
                gameInit.startGame();
            }
        })
    }

    this.roundComplete = function () {

        // First, log an initial status update in the console
        // telling us how many wins, losses, and guesses are left.
        console.log("WinCount: " + gameInit.winCounter + " | LossCount: " + gameInit.lossCounter + " | GuessesLeft: " + gameInit.guessesLeft);

        // Update the HTML to reflect the new number of guesses.
        console.log(gameInit.guessesLeft);

        // This will print the array of guesses and blanks onto the page.
        console.log(gameInit.blanksAndSuccesses.join(" "));

        // This will print the wrong guesses onto the page.
        console.log(gameInit.wrongGuesses.join(" "));

        // If our hangman string equals the solution.
        // (meaning that we guessed all the letters to match the solution)...
        if (gameInit.lettersInChosenWord.toString() === gameInit.blanksAndSuccesses.toString()) {

            // Add to the win counter
            gameInit.winCounter++;

            // Give the user an alert
            console.log("You win!");

            // Update the win counter in the HTML
            console.log(gameInit.winCounter);

            // Restart the game
            this.restart();
        }

        // If we've run out of guesses
        else if (gameInit.guessesLeft === 0) {

            // Add to the loss counter
            gameInit.lossCounter++;

            // Give the user an alert
            console.log("You lose");

            // Update the loss counter in the HTML
            console.log(gameInit.lossCounter);

            // Restart the game
            this.restart();

        } else {
            inquirer.prompt([{
                type: "input",
                name: "letterGuessed",
                message: "Type your guess: a lowecase letter."
            }]).then(function (event) {
                that.checkLetters(event.letterGuessed);

                that.roundComplete();
            })
        }

    }

    // function will prompt the user to guess a letter thus beginning the game.
    this.firstPrompt = function () {

        // here we set the prompt using the inquirer module
        inquirer.prompt([{

            // the input type means the user response will be read as a string.
            type: "input",

            // name is how we will later refer to the response given here
            name: "letterGuessed",
            message: "Type your guess: a lowecase letter."

            // once the prompt has run the functions below will execute.
        }]).then(function (event) {

            // we run the checkLetter function written above to check whether or not our string matches any of the letters in the word we are guessing
            that.checkLetters(event.letterGuessed);

            // We run the complete round function after that to determine what happens next.
            that.roundComplete();
        })
    }
    gameInit.startGame();
    this.firstPrompt();
}

//gameInit.startGame();
//firstPrompt();
module.exports = Words;