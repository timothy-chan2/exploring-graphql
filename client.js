// const rolls = 3;
// const sides = 6;
// const query = `query DiceAndQuote($rolls: Int!, $sides: Int) {
//   rollDice(numSides: $sides) {
//     rollOnce
//     roll(numRolls: $rolls)
//   },
//   quoteOfTheDay
// }`;

const author = "Joe";
const content = "Ahoy there!";
const query = `mutation CreateMessage($input: MessageInput) {
  createMessage(input: $input) {
    id
    content
    author
  }
}`;
 
// const query = `query ViewMessage {
//   getMessage(id: "14ecc38e5ba39090ad62") {
//     content
//     author
//   }
// }`;

fetch("http://localhost:4000/graphql", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  body: JSON.stringify({
    query,
    //variables: { rolls, sides },
    variables: {
      input: {
        author,
        content
      }
    }
  }),
})
.then(response => response.json())
.then(res => console.log("The following is the data returned:", res));