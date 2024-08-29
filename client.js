const dice = 3;
const sides = 6;
const query = `query DiceAndQuote($dice: Int!, $sides: Int) {
  rollDice(numDice: $dice, numSides: $sides),
  quoteOfTheDay
}`;
 
fetch("http://localhost:4000/graphql", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  body: JSON.stringify({
    query,
    variables: { dice, sides },
  }),
})
.then(response => response.json())
.then(data => console.log("The following is the data returned:", data));