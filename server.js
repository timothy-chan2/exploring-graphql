const { buildSchema } = require("graphql");
const express = require("express");
const { createHandler } = require("graphql-http/lib/use/express");
 
// Construct a schema
const schema = buildSchema(`
  type Query {
    hello: String
  }
`);
 
// The resolver function for each API endpoint
const rootValue = {
  hello() {
    return "Hello world!";
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