let randomNumber = getRandomNumber()
let remainingGuesses = 0
let ultraLevelGuesses = 2
let hardLevelGuesses = 5
let mediumLevelGuesses = 10
let easyLevelGuesses = 15
let numberOfGuesses = 0
let guess
let MAX_BOUNDS
let MIN_BOUNDS
let gameStatusLoser = "COMPUTER WON!"
let gameStatusWinner = "PLAYER WON!"

const imageUrls = [
    "images/babyYes.jpg",
    "images/no.jpg"
]

let rand = document.getElementById("randomNum")
rand.innerHTML = randomNumber
document.getElementById("randomNum").style.display = "none"
console.log(randomNumber)

let msg = document.getElementById("message")
let gameOver = document.getElementById("borders")

/*let howManyGuesses = document.getElementById("guesses")
howManyGuesses.innerHTML = remainingGuesses*/

let easy = document.getElementById("easyBtn")
let medium = document.getElementById("mediumBtn")
let hard = document.getElementById("hardBtn")
let ultra = document.getElementById("ultraBtn")

let guessBtn = document.getElementById("btn1")
let resetGuessBtn = document.getElementById("btn2")
let resetFieldsBtn = document.getElementById("btn3")

/*guessBtn.addEventListener("click",function(event){
    if(event.target === easy ){
        MAX_BOUNDS = easyLevelGuesses
        MIN_BOUNDS = 1
    }
})*/

easy.addEventListener("click",function(){
    displayDifficultLevel(easyLevelGuesses)
})

medium.addEventListener("click",function(){
  displayDifficultLevel(mediumLevelGuesses)
})

hard.addEventListener("click",function(){
    displayDifficultLevel(hardLevelGuesses)
})

ultra.addEventListener("click",function(){
    displayDifficultLevel(ultraLevelGuesses)
})

function displayDifficultLevel(difficulty){
    remainingGuesses = difficulty
    let guess = document.getElementById("counter")
    guess.innerHTML = remainingGuesses
    return remainingGuesses
   
}

guessBtn.addEventListener("click",function(){
    if(guessOutOfBoundsCheck(0,3) && checkForEmptyGuess()){
        checkGuess()
    }
},false)

resetGuessBtn.addEventListener("click",function(){
    resetGuess()
})

resetFieldsBtn.addEventListener("click",function(){
    resetFields()
})

function guessOutOfBoundsCheck(MIN_BOUNDS,MAX_BOUNDS){
    let check = false
    let guess = document.getElementById("guessBox").value
    if(guess < MIN_BOUNDS || guess > MAX_BOUNDS){
        console.log("jelllllllooo")
        showMessage("GUESS IS OUT OF BOUNDS!")
        check = false
    }else{
        check = true
    }
    return check
}

function checkForEmptyGuess(){
    let check = false
    guess = document.getElementById("guessBox").value.trim()
    if(guess === ""){
        showMessage("GUESS CANNOT BE EMPTY!")
        console.log("invalid")
        check = false
    }else{
        check = true
    }
    return check
}

function checkGuess(){
    let check = false
    //let userGuess = document.getElementById("guessBox").value.trim();
    if(guess == randomNumber){
        check = true
        playerWon()
        checkWhichImageToDisplay(imageUrls[0])
        showMessage("You got it!", "success")
        resetGuess()
    }else if(guess > randomNumber){
        showMessage("Guess is too high!", "TooHigh")
        decrementNumberOfGuesses()
        checkGuessesLeft()
    }else if(guess < randomNumber){
        showMessage("Guess is too low!", "TooLow")
        decrementNumberOfGuesses()
        checkGuessesLeft()
    }else{
        showMessage("Wrong guess Entered!", "ErrorWrongNumberEntered")
        decrementNumberOfGuesses()
    }
    return check
}

function playerWon(){
    msg.innerHTML = "You Got it!"
    gameOver.innerHTML = gameStatusWinner
    rand.innerHTML = randomNumber
    document.getElementById("randomNum").style.display = "block"
    document.getElementById("borders").style.display = "block"
    randomNumber = getRandomNumber()
}

function decrementNumberOfGuesses(){
    remainingGuesses--
    let guess = document.getElementById("counter");
    guess.innerHTML = remainingGuesses;

}

function checkGuessesLeft(){
    if(remainingGuesses === 0){
        showMessage("GAME OVER!", "gameOver")
        gameOver.innerHTML = gameStatusLoser
        document.getElementById("borders").style.display = "block"
        checkWhichImageToDisplay(imageUrls[1])
        resetGuess()
    }
}

function checkWhichImageToDisplay(arr){
    const images = document.getElementById("border")
    if(checkGuess){
        const loserImage = document.createElement("img")
        loserImage.src = arr
        loserImage.style.width = "300px"
        loserImage.style.height = "auto"
        images.appendChild(loserImage)
        setTimeout(function(){
            images.removeChild(loserImage)
        },3000)
    }
}

function displayRandomNumber(){
    rand.innerHTML = randomNumber
    document.getElementById("randNum").style.display = "block"
}

function resetGuess(){
    const difficultyLevel = getDifficultyLevel()
    remainingGuesses = difficultyLevel
    randomNumber = getRandomNumber()
    guesses.innerHTML = remainingGuesses
    hideMessage()
}

function getDifficultyLevel() {
    // You can use a variable to store the current difficulty level
    let difficulty = 0;

    // Determine the difficulty level based on which button was pressed
    if (easy.classList.contains("active")) {
        difficulty = easyLevelGuesses;
    } else if (medium.classList.contains("active")) {
        difficulty = mediumLevelGuesses;
    } else if (hard.classList.contains("active")) {
        difficulty = hardLevelGuesses;
    } else if (ultra.classList.contains("active")) {
        difficulty = ultraLevelGuesses;
    }

    return difficulty;
}


function resetFields(){
    const clearText = document.getElementById("guessBox")
    clearText.value = "";
    document.getElementById("randomNum").style.display = "none"
    document.getElementById("borders").style.display = "none"
}

function getRandomNumber(){
    return Math.floor(Math.random() * 3) + 1
}

function showMessage(messages,messageType){
    const messageClasses = {
        success: "success",
        TooHigh: "TooHigh",
        TooLow: "TooLow",
        ErrorWrongnumberentered: "ErrorWrongnumberentered",
        ErrorEmptyGuess: "ErrorEmptyGuess",
        ErrorOutOfBoundsGuess: "ErrorOutOfBoundsGuess",
        gameOver: "gameOver"
    }
    const msg = document.getElementById("message")
    msg.classList.remove(...Object.values(messageClasses))
    msg.textContent = messages

    const messageClass = messageClasses[messageType] || "uknown"
    msg.classList.add(messageClass)
    msg.style.display = "block"

    setTimeout(function(){
        hideMessage()
    },3000)
}

function hideMessage(){
    let msg = document.getElementById("message")
    msg.style.display = "none"
}

hideMessage()