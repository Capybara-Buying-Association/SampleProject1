// NOTES:
//      anon function rules 
//          function(param) { return x }
//          (param) => { return x }
//          param => { return x }
//          param => return x
// note need brackets around parameters if more than one parameter
//
//      promise syntax
//          then
//          catch
//
//      string / array methods
//          split 
//          filter
const wordList = new Promise((resolve, reject) => {
    fetch('https://raw.githubusercontent.com/dolph/dictionary/master/popular.txt')
    .then(buffer => buffer.text())
    .then(data => {
        resolve(data.split("\n").filter(word => word.length > 3))
    }).catch(err => {
        reject(err)
    })
})


// NOTES:
//      backquote formatting using ${}
function getDictionaryMeaning(word) {
    return new Promise((resolve, reject) => {
        fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
        .then(buffer => buffer.json())
        .then(data => resolve(data))
        .catch(err => reject(err))
    })
}


// NOTES:
//      async functions
//          allows you to resolve promises without using cumbersome then syntax
//          only in async functions
//          await should be in brackets
//              i.e doesnt work in global scope
//              can get around this by declaring an anon function and calling it immediately - see below
//              (() => {
//                  // code here
//              })()
async function findNLetterWord(numLetters) {
    const filteredList = (await wordList).filter(word => word.length == numLetters)
    let randomWord = filteredList[Math.floor(Math.random() * filteredList.length)]

    // return randomWord

    // ===================== extension task =====================

    // sometimes dictionary does not have entry for word 
    let dictData = (await getDictionaryMeaning(randomWord))[0]
    if (!dictData) {
        return await findNLetterWord(numLetters)
    }

    // remap dictionary data so we're left with only what we need
    //      this is an extra step but makes html construction 
    //      more straightforward down the line
    let remappedDictData = {
        "word": randomWord,
        "phonetic": dictData.phonetic,
        "meanings": []
    }

    dictData.meanings.forEach(meaning => {
        const remappedMeanings = meaning.definitions.map(def => {
            return {
                "category": meaning.partOfSpeech,
                "definition": def.definition
            }
        })
        remappedDictData.meanings.push(...remappedMeanings)
    })

    return remappedDictData
}
