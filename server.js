const { graphql, buildSchema } = require("graphql");
 
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
 
// Run the GraphQL query '{ hello }'
graphql({
  schema,
  source: "{ hello }",
  rootValue
}).then(response => {
  console.log(response.data.hello);
});