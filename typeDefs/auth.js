const { gql } = require("apollo-server-express");

module.exports = gql`

  type Student {
    name: String!
    age:Int!
    roll:Int!
    class:Int!
  }

  type Query {
    getAllUsers: [Student!]!
}

`;
