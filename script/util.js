/**
 * shuffles a string
 * @param {string} word 
 * @returns 
 */
function shuffleString(word) {
    let wordAsArray = [...word]
    let shuffled = wordAsArray.sort((a,b) => {
        return Math.random() - .5
    })
    let shuffledWord = shuffled.join("")
    if (shuffledWord == word) {
        return shuffleString(word)
    } else {
        return shuffledWord
    }
}

/**
 * Constructs a html element with word definnitions
 * @param {word} word
 * @returns htmlElement 
 */
function constructDefinitionElement(word) {
    // when constructing html with javascript
    //      its a good idea to block it out in html first 
    //      then translate it to javascript

    /**
     * <div class="dictionary-meaning">
     *      <p>word</p>
     *      <p>phonetic</p>
     *      <div>
     *          <p>definition1</p>
     *          <p>definition2</p>
     *          ...
     *      </div>
     * </div>   
     */

    let dictionaryContainer = document.createElement("div")
    dictionaryContainer.className = "dictionary-meaning"

    let wordText = document.createElement("p")
    wordText.innerText = word.word

    // sometimes api returns undefined for phonetic 
    let phoneticText
    if (word.phonetic) {
        phoneticText = document.createElement("p")
        phoneticText.innerText = word.phonetic    
    }

    let definitionContainer = document.createElement("div")

    word.meanings.forEach(meaning => {
        let text = document.createElement("p")
        text.innerText = meaning.category + " : " + meaning.definition
        definitionContainer.appendChild(text)
    })

    dictionaryContainer.appendChild(wordText)
    if(phoneticText) {
        dictionaryContainer.appendChild(phoneticText)
    }
    dictionaryContainer.appendChild(definitionContainer)

    return dictionaryContainer
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
