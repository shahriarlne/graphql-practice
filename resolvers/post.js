const {gql} = require('apollo-server-express');
const {student} = require('../temp');

const getAllUsers = ()=> student;

module.exports= {
    Query:{ 
        getAllUsers
    },


}