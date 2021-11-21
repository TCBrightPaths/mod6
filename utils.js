function shuffleArray(array) {
    let arrCopy = array //-->maybe fixed this so that it would just be one array instead of an object inside of an array. 
    for (let i = arrCopy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arrCopy[i], arrCopy[j]] = [arrCopy[j], arrCopy[i]];
    }
    return arrCopy
    //console.log(arrCopy.length) //-->WOW it was never actually an array? & the function adds an array into another array? so it always has a count of one? So were my tests supposed to fail?!!!!!!! 
}

//(shuffleArray([1,2,3,4,5])) //--> function returns an array of numbers correctly shuffled. Everything should work but somehow doesn't when I run my tests. 

module.exports = {
    shuffleArray
}