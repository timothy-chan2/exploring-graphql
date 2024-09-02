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

  input MessageInput {
    content: String
    author: String
  }

  type Message {
    id: ID!
    content: String
    author: String
  }
  
  type Query {
    quoteOfTheDay: String
    random: Float!
    rollDice(numSides: Int): RandomDie
    getMessage(id: ID!): Message
  }

  type Mutation {
    createMessage(input: MessageInput): Message
    updateMessage(id: ID!, input: MessageInput): Message
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

class Message {
  constructor(id, { content, author }) {
    this.id = id;
    this.content = content;
    this.author = author;
  };
};

const tempDatabase = {};

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
  },
  getMessage({ id }) {
    if (!tempDatabase[id]) {
      throw new Error(`Message with ID ${id} does not exist.`);
    };

    return new Message(id, tempDatabase[id]);
  },
  createMessage({ input }) {
    const id = require("crypto").randomBytes(10).toString("hex");
    tempDatabase[id] = input;

    return new Message(id, input);
  },
  updateMessage({ id, input }) {
    if (!tempDatabase[id]) {
      throw new Error(`Message with ID ${id} does not exist.`);
    };
    tempDatabase[id] = input;

    return new Message(id, input);
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
app.listen(4000, () => {
  console.log("GraphQL API server running at http://localhost:4000/graphql");
});