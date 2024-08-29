const rolls = 3;
const sides = 6;
const query = `query DiceAndQuote($rolls: Int!, $sides: Int) {
  rollDice(numSides: $sides) {
    rollOnce
    roll(numRolls: $rolls)
  },
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
    variables: { rolls, sides },
  }),
})
.then(response => response.json())
.then(res => console.log("The following is the data returned:", res));