const { buildSchema } = require("graphql");
const express = require("express");
const { createHandler } = require("graphql-http/lib/use/express");
 
// Construct a schema
// ! after the type means that it cannot be null
const schema = buildSchema(`
  type RandomDie {
    numSides: Int!
    rollOnce: Int!
    roll(numRolls: Int!): [Int]
  }
  
  type Query {
    quoteOfTheDay: String
    random: Float!
    rollDice(numSides: Int): RandomDie
  }
`);

// GraphQL object type
class RandomDie {
  constructor(numSides) {
    this.numSides = numSides;
  };

  rollOnce() {
    return 1 + Math.floor(Math.random() * this.numSides);
  };

  roll({ numRolls }) {
    const result = [];
    for (let i = 0; i < numRolls; i++) {
      result.push(this.rollOnce());
    }
    
    return result;
  };
};

// The resolver function for each API endpoint
const rootValue = {
  quoteOfTheDay() {
    return Math.random() < 0.5 ? "First quote" : "Second quote";
  },
  random() {
    return Math.random();
  },
  rollDice({ numSides }) {
    return new RandomDie(numSides || 6);
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