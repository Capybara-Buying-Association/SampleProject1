
const wordContainer = document.getElementById("word-container")
const shuffledWordP = document.getElementById("shuffledWord")


// 2 ways to listen for events:
//   first is declare on html element (one function per element)
//      eg    onclick="exmaple()"

//   seccond is to add an event listener (multiple functions per element)
//      eg element.addEventListener('click', (event) => {})

//      TIP: can get the clicked element with event.target 
//          so adding an event listener to window then checking
//          event.target for certain classes or ids 
//          can help for dynamically generated content

//      TIP: use console log to check structure of data/objects/json in web console 

document.getElementById('word-length').addEventListener('input', event => {
    document.getElementById('word-length-display').innerText = event.target.value
})
// set on page load
document.getElementById('word-length-display').innerText = document.getElementById('word-length').value

function showAnswer() {
    shuffledWordP.innerText = window.currentWord.word
    document.getElementById("guess-container").classList.add("hidden")
    document.getElementById("dictionary-meaning").innerHTML = ""
    document.getElementById("dictionary-meaning").appendChild(constructDefinitionElement(window.currentWord))
}

function clearAnswer() {
    document.getElementById("dictionary-meaning").innerHTML = ""
    document.getElementById("guess-input").value = ""
}


// can add variables to the window object for global scoped
//      variables which dont survive a page reload
async function getNewWord(event) {

    // show answer when skip
    if (window.currentWord && !wordContainer.classList.contains("correct")) {
        showAnswer()
        await sleep(1500)
    }
    // findNLetterWord takes some time so replace shuffledWord with loading
    shuffledWordP.innerText = "loading"

    document.getElementById("new-word-button").disabled = true
    wordContainer.classList.remove("correct")
    wordContainer.classList.remove("false")

    clearAnswer()

    console.log("getting new word")
    let wordLength = document.getElementById('word-length').value

    // note: randWord is an object {word: "", meaning: "", ...}
    const randWord = await findNLetterWord(wordLength)
    window.currentWord = randWord

    
    const shuffled = shuffleString(randWord.word)
    shuffledWordP.innerText = shuffled

    document.getElementById("guess-container").classList.remove("hidden")
    document.getElementById("new-word-button").disabled = false
}


async function submitGuess(event) {
    const guess = document.getElementById("guess-input").value.trim().toLowerCase()

    if (guess === window.currentWord.word) {
        showAnswer()
        // add class to trigger animation
        wordContainer.classList.add("correct")
    } else {
        // add class to trigger animation
        wordContainer.classList.add("false")
        await sleep(500)
        // remove class to reset animation
        wordContainer.classList.remove("false")
    }
}

getNewWord()