var inquirer = require("inquirer");
var Letter = require("./letter.js");

// var gameInit = new Letter();

var Words = function () {
    var that = this;
    this.gameInit = new Letter();
    this.checkLetters = function (letter) {

        // // This boolean will be toggled based on whether or not
        // // a user letter is found anywhere in the word.
        // var letterInWord = false;

        // // Check if a letter exists inside the array at all.
        // for (var i = 0; i < gameInit.numBlanks; i++) {

        //     if (gameInit.chosenWord[i] === letter) {

        //         // If the letter exists then toggle this boolean to true.
        //         // This will be used in the next step.
        //         letterInWord = true;
        //     }
        // }

        // If the letter exists somewhere in the word,
        // then figure out exactly where (which indices).
        // if (letterInWord) {
            var letterMatched = 0;
            // Loop through the word
            for (var j = 0; j < this.gameInit.numBlanks; j++) {

                // Populate the blanksAndSuccesses with every instance of the letter.
                if (this.gameInit.chosenWord[j] === letter) {
                    letterMatched += 1;
                    // Here we set specific blank spaces to equal the correct letter
                    // when there is a match.
                    this.gameInit.blanksAndSuccesses[j] = letter;
                }
            }

            // Log the current blanks and successes for testing.
            console.log(this.gameInit.blanksAndSuccesses);
        // }

        // If the letter doesn't exist at all...
        if (letterMatched === 0) {

            // Then we add the letter to the list of wrong letters.
            this.gameInit.wrongGuesses.push(letter);

            // We also subtract one of the guesses.
            this.gameInit.guessesLeft--;

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
                that.gameInit.startGame();
                that.firstPrompt();
            } //else {
            //     return
            //     // if the user responds no they will just return to their terminal
            //     //gameInit.startGame();
            // }
        })
    }

    this.roundComplete = function () {

        // First, log an initial status update in the console
        // telling us how many wins, losses, and guesses are left.
        console.log("WinCount: " + this.gameInit.winCounter + " | LossCount: " + this.gameInit.lossCounter + " | GuessesLeft: " + this.gameInit.guessesLeft);

        // Update node to reflect the new number of guesses.
        console.log(this.gameInit.guessesLeft);

        // This will print the array of guesses and blanks onto the page.
        console.log(this.gameInit.blanksAndSuccesses.join(" "));

        // This will print the wrong guesses onto the page.
        console.log(this.gameInit.wrongGuesses.join(" "));

        // If our hangman string equals the solution.
        // (meaning that we guessed all the letters to match the solution)...
        if (this.gameInit.lettersInChosenWord.toString() === this.gameInit.blanksAndSuccesses.toString()) {

            // Add to the win counter
            this.gameInit.winCounter++;

            // Give the user an alert
            console.log("You win!");

            // Update the win counter in the HTML
            console.log(this.gameInit.winCounter);

            // Restart the game
            this.restart();
        }

        // If we've run out of guesses
        else if (this.gameInit.guessesLeft === 0) {

            // Add to the loss counter
            this.gameInit.lossCounter++;

            // Give the user an alert
            console.log("You lose");

            // Update the loss counter in the HTML
            console.log(this.gameInit.lossCounter);

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

    // this.gameInit.startGame();
    // this.firstPrompt();
}

//gameInit.startGame();
//firstPrompt();
module.exports = Words;