//Converts a given string (single word) into pig latin
function pigLatinifyWord(word: string) : string {
  //if doesn't start with a letter, return unchanged
  if(/[^a-z]/i.test(word.charAt(0))){ //using regex to test not letter a-z
    return word;
  }

  //if starts with vowels
  if(/[aeiou]/i.test(word.charAt(0))) { //regex test vs. vowel
    return word+'way';
  }
  else { //starts with consonent
    const firstVowel = word.search(/[aeiou]/i);
    return word.slice(firstVowel)+word.slice(0,firstVowel)+'ay';
  }
}

export = pigLatinifyWord;