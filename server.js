const { buildSchema } = require("graphql");
const express = require("express");
const { createHandler } = require("graphql-http/lib/use/express");
 
// Construct a schema
// ! after the type means that it cannot be null
const schema = buildSchema(`
  type Query {
    quoteOfTheDay: String
    random: Float!
    roolThreeDice: [Int]
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
  roolThreeDice() {
    return [1, 2, 3].map(_ => 1 + Math.floor(Math.random() * 6));
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