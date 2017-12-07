var inquirer = require("inquirer");

//This is the list on words that may be selected for the player to guess.
var Letter = function () {

    this.randomWords = ["cat", "save", "blink", "job", "words", "Supercalifragilisticexpialidocious"];

    //This will hold the random word selected by compguess.
    this.chosenWord = "";

    // This will break the solution into individual letters to be stored in array.
    this.lettersInChosenWord = [];

    // This will be the number of blanks we show based on the solution.
    this.numBlanks = 0;

    // Holds a mix of blank and solved letters (ex: 'n, _ _, n, _').
    this.blanksAndSuccesses = [];

    // Holds all of the wrong guesses.
    this.wrongGuesses = [];

    // Holds the letters guessed
    this.letterGuessed = "";

    // Game counters
    this.winCounter = 0;
    this.lossCounter = 0;
    this.guessesLeft = 10;

    // startGame()
    // It's how we we will start and restart the game.
    // (Note: It's not being run here. Function declarations like this are made for future use.)

    this.startGame = function () {

        // Reset the guesses back to 0.
        this.guessesLeft = 10;

        // Solution chosen randomly from wordList.
        this.chosenWord = this.randomWords[Math.floor(Math.random() * this.randomWords.length)];

        // The word is broken into individual letters.
        this.lettersInChosenWord = this.chosenWord.split("");

        // We count the number of letters in the word.
        this.numBlanks = this.lettersInChosenWord.length;

        // We print the solution in console (for testing).
        //console.log(this.chosenWord);

        // CRITICAL LINE
        // Here we *reset* the guess and success array at each round.
        this.blanksAndSuccesses = [];

        // CRITICAL LINE
        // Here we *reset* the wrong guesses from the previous round.
        this.wrongGuesses = [];

        // Fill up the blanksAndSuccesses list with appropriate number of blanks.
        // This is based on number of letters in solution.
        for (var i = 0; i < this.numBlanks; i++) {
            this.blanksAndSuccesses.push("_");
        }

        // Print the initial blanks in console.
        console.log(this.blanksAndSuccesses);

        // Reprints the guessesLeft to 9.
        console.log(this.guessesLeft);

        // Prints the blanks at the beginning of each round in the HTML.
        console.log(this.blanksAndSuccesses.join(" "));

        // Clears the wrong guesses from the previous round.
        console.log(this.wrongGuesses.join(" "));
    }
}

module.exports = Letter;