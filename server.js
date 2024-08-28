const { buildSchema } = require("graphql");
const express = require("express");
const { createHandler } = require("graphql-http/lib/use/express");
 
// Construct a schema
// ! after the type means that it cannot be null
const schema = buildSchema(`
  type Query {
    quoteOfTheDay: String
    random: Float!
    rollDice(numDice: Int!, numSides: Int): [Int]
  }
`);
 
// The resolver function for each API endpoint
const rootValue = {
  quoteOfTheDay() {
    return Math.random() < 0.5 ? "First quote" : "Second quote";
  },
  random() {
    return Math.random();
  },
  rollDice({ numDice, numSides }) {
    const result = [];
    for (let i = 0; i < numDice; i++) {
      result.push(1 + Math.floor(Math.random() * (numSides || 6)));
    }
    
    return result;
  }
};

const app = express();

// GraphQL handler
app.all(
  "/graphql",
  createHandler({
    schema: schema,
    rootValue: rootValue
  })
);

// Start the server
app.listen(4000);
console.log("GraphQL API server running at http://localhost:4000/graphql");