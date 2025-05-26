// a function to split a paragraph into words
export default function split(text: String): String[] {
  const wordList = text.split(/ +|\n/); // regex to split

  return wordList;
}
